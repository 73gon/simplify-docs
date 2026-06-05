import { defaultLocale, isLocale } from "@/i18n/messages"
import type { Locale } from "@/i18n/messages"
import type {
  Audience,
  DocEntry,
  OverviewEntry,
  ProductMeta,
  ResolvedDoc,
} from "@/content/types"
import { audienceSegments, segmentToAudience } from "@/content/types"

// ---------------------------------------------------------------------------
// Product registry — every `content/<product>/meta.ts` default export.
// ---------------------------------------------------------------------------

const metaModules = import.meta.glob<{ default: ProductMeta }>(
  "../../content/*/meta.ts",
  { eager: true }
)

export const products: ProductMeta[] = Object.values(metaModules)
  .map((m) => m.default)
  .sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0) || a.name.localeCompare(b.name)
  )

export const productsById = new Map(products.map((p) => [p.id, p]))

export function getProduct(id: string): ProductMeta | undefined {
  return productsById.get(id)
}

// ---------------------------------------------------------------------------
// Documentation pages — every `content/<product>/<audience>/<name>.<locale>.mdx`.
// ---------------------------------------------------------------------------

type MdxModule = {
  default: DocEntry["Component"]
  frontmatter?: Record<string, unknown>
}

const docModules = import.meta.glob<MdxModule>("../../content/*/*/*.mdx", {
  eager: true,
})

const overviewModules = import.meta.glob<MdxModule>(
  "../../content/*/product.*.mdx",
  { eager: true }
)

function parsePath(path: string) {
  // e.g. ../../content/simptrack/user-manual/uebersicht.de.mdx
  const parts = path.split("/")
  const file = parts[parts.length - 1]
  const audienceSegment = parts[parts.length - 2]
  const product = parts[parts.length - 3]
  const match = file.match(/^(.+)\.([a-z]{2})\.mdx$/)
  if (!match) return null
  const [, name, localeRaw] = match
  if (!isLocale(localeRaw)) return null
  const audience = segmentToAudience[audienceSegment]
  if (!audience) return null
  return { product, audience, name, locale: localeRaw }
}

const allDocs: DocEntry[] = []

for (const [path, mod] of Object.entries(docModules)) {
  const parsed = parsePath(path)
  if (!parsed) continue
  const fm = mod.frontmatter ?? {}
  if (fm.status === "draft") continue
  allDocs.push({
    product: parsed.product,
    audience: parsed.audience,
    slug: typeof fm.slug === "string" ? fm.slug : parsed.name,
    locale: parsed.locale,
    title: typeof fm.title === "string" ? fm.title : parsed.name,
    description:
      typeof fm.description === "string" ? fm.description : undefined,
    order: typeof fm.order === "number" ? fm.order : 999,
    updated: typeof fm.updated === "string" ? fm.updated : undefined,
    appliesTo: typeof fm.appliesTo === "string" ? fm.appliesTo : undefined,
    Component: mod.default,
  })
}

// Overview pages: content/<product>/product.<locale>.mdx
const overviews: OverviewEntry[] = []
for (const [path, mod] of Object.entries(overviewModules)) {
  const file = path.split("/").pop() ?? ""
  const match = file.match(/^product\.([a-z]{2})\.mdx$/)
  const product = path.split("/").slice(-2)[0]
  if (!match) continue
  const localeRaw = match[1]
  if (!isLocale(localeRaw)) continue
  overviews.push({ product, locale: localeRaw, Component: mod.default })
}

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

export function getProductDocs(product: string): DocEntry[] {
  return allDocs.filter((d) => d.product === product)
}

/** Ordered list of docs for one product+audience+locale (with locale fallback). */
export function getAudienceDocs(
  product: string,
  audience: Audience,
  locale: Locale
): DocEntry[] {
  const inLocale = allDocs.filter(
    (d) =>
      d.product === product && d.audience === audience && d.locale === locale
  )
  const bySlug = new Map(inLocale.map((d) => [d.slug, d]))
  // Fill gaps with the default-locale version so navigation is never empty.
  for (const d of allDocs) {
    if (
      d.product === product &&
      d.audience === audience &&
      d.locale === defaultLocale
    ) {
      if (!bySlug.has(d.slug)) bySlug.set(d.slug, d)
    }
  }
  return [...bySlug.values()].sort(
    (a, b) => a.order - b.order || a.title.localeCompare(b.title)
  )
}

export function getAudiences(product: string): Audience[] {
  const meta = getProduct(product)
  if (meta) return meta.audiences
  return [
    ...new Set(
      allDocs.filter((d) => d.product === product).map((d) => d.audience)
    ),
  ]
}

/** Resolve a single doc page, falling back to the default locale if missing (Q24). */
export function resolveDoc(
  product: string,
  audience: Audience,
  slug: string,
  locale: Locale
): ResolvedDoc | null {
  const exact = allDocs.find(
    (d) =>
      d.product === product &&
      d.audience === audience &&
      d.slug === slug &&
      d.locale === locale
  )
  if (exact) return { entry: exact, fallback: false }
  const fallback = allDocs.find(
    (d) =>
      d.product === product &&
      d.audience === audience &&
      d.slug === slug &&
      d.locale === defaultLocale
  )
  if (fallback) return { entry: fallback, fallback: true }
  return null
}

export function getAdjacentDocs(
  product: string,
  audience: Audience,
  slug: string,
  locale: Locale
): { prev?: DocEntry; next?: DocEntry } {
  const ordered = getAudienceDocs(product, audience, locale)
  const index = ordered.findIndex((d) => d.slug === slug)
  if (index === -1) return {}
  return { prev: ordered[index - 1], next: ordered[index + 1] }
}

export function resolveOverview(
  product: string,
  locale: Locale
): { entry: OverviewEntry; fallback: boolean } | null {
  const exact = overviews.find(
    (o) => o.product === product && o.locale === locale
  )
  if (exact) return { entry: exact, fallback: false }
  const fallback = overviews.find(
    (o) => o.product === product && o.locale === defaultLocale
  )
  if (fallback) return { entry: fallback, fallback: true }
  return null
}

/** All routable doc paths (used for sitemap + prerendering). */
export function getAllDocPaths(): Array<{
  product: string
  audience: Audience
  slug: string
}> {
  const seen = new Set<string>()
  const out: Array<{ product: string; audience: Audience; slug: string }> = []
  for (const d of allDocs) {
    const key = `${d.product}/${d.audience}/${d.slug}`
    if (seen.has(key)) continue
    seen.add(key)
    out.push({ product: d.product, audience: d.audience, slug: d.slug })
  }
  return out
}

// ---------------------------------------------------------------------------
// Search — a lightweight in-memory index built from the registry. Works in dev
// and prod without any external service.
// ---------------------------------------------------------------------------

export type SearchEntry = {
  product: string
  productName: string
  audience: Audience
  section: string
  title: string
  description?: string
  /** Includes the section hash, e.g. "/simptrack/user-manual#filter". */
  url: string
  haystack: string
}

export function getSearchEntries(locale: Locale): SearchEntry[] {
  const entries: SearchEntry[] = []
  for (const product of products) {
    for (const audience of product.audiences) {
      const sectionLabel = audience === "user" ? "user-manual" : "config-guide"
      for (const doc of getAudienceDocs(product.id, audience, locale)) {
        entries.push({
          product: product.id,
          productName: product.name,
          audience,
          section: sectionLabel,
          title: doc.title,
          description: doc.description,
          url: `/${product.id}/${audienceSegments[audience]}#${doc.slug}`,
          haystack:
            `${product.name} ${doc.title} ${doc.description ?? ""}`.toLowerCase(),
        })
      }
    }
  }
  return entries
}
