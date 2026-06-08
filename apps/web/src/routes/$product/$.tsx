import { createFileRoute, notFound } from "@tanstack/react-router"
import { useEffect, useState } from "react"

import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { mdxComponents } from "@/components/mdx"
import { useSearch } from "@/components/search/search-context"
import { JsonLd } from "@/components/seo/json-ld"
import { TableOfContents } from "@/components/toc"
import { getAudienceDocs, getProduct } from "@/content/registry"
import { audienceSegments, segmentToAudience } from "@/content/types"
import type { Audience } from "@/content/types"
import { useLocale, useT } from "@/i18n/context"
import { SITE_NAME, absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/site"

export const Route = createFileRoute("/$product/$")({
  head: ({ params }) => {
    const product = getProduct(params.product)
    const segments = (params._splat ?? "").split("/").filter(Boolean)
    const audience = segmentToAudience[segments[0]]
    const url = absoluteUrl(`/${params.product}/${segments[0] ?? ""}`)
    const title = product ? `${product.name} · ${SITE_NAME}` : SITE_NAME
    const description = product?.description.de
    return {
      meta: [
        { title },
        ...(description ? [{ name: "description", content: description }] : []),
        { property: "og:title", content: title },
        ...(description
          ? [{ property: "og:description", content: description }]
          : []),
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: DEFAULT_OG_IMAGE },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: audience
        ? [
            { rel: "canonical", href: url },
            { rel: "alternate", hrefLang: "x-default", href: url },
            { rel: "alternate", hrefLang: "de", href: url },
            { rel: "alternate", hrefLang: "en", href: url },
          ]
        : [],
    }
  },
  component: DocPage,
})

function DocPage() {
  const { product: productId, _splat } = Route.useParams()
  const locale = useLocale()
  const t = useT()
  const { setScope } = useSearch()
  const [drawer, setDrawer] = useState(false)

  const segments = (_splat ?? "").split("/").filter(Boolean)
  const deepLink = segments[1]

  useEffect(() => {
    setScope(productId)
    return () => setScope(undefined)
  }, [productId, setScope])

  useEffect(() => {
    setDrawer(false)
  }, [_splat])

  // Scroll to a deep-linked section (#slug, or a legacy /audience/slug URL).
  useEffect(() => {
    const id = window.location.hash.slice(1) || deepLink
    if (!id) return
    const el = document.getElementById(id)
    if (el) requestAnimationFrame(() => el.scrollIntoView({ block: "start" }))
  }, [deepLink, locale])

  const product = getProduct(productId)
  if (!product) throw notFound()

  const audience: Audience | undefined = segmentToAudience[segments[0]]
  if (!audience) throw notFound()

  const docs = getAudienceDocs(productId, audience, locale)
  if (docs.length === 0) throw notFound()

  const hasFallback = docs.some((d) => d.locale !== locale)
  const audienceLabel = t(
    audience === "user" ? "audience.user" : "audience.config"
  )

  const nav = (onNavigate?: () => void) => (
    <div className="flex flex-col gap-6 py-6">
      <Sidebar
        productId={productId}
        audience={audience}
        audiences={product.audiences}
        onNavigate={onNavigate}
      />
      <TableOfContents contentKey={`${productId}/${audience}/${locale}`} />
    </div>
  )

  return (
    <div className="flex min-h-svh flex-col">
      <Header onMenu={() => setDrawer(true)} productName={product.name} />

      <div className="mx-auto flex w-full max-w-screen-2xl flex-1 px-4">
        {/* Left: product switch + tree TOC (desktop) */}
        <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-border pr-4 lg:block">
          {nav()}
        </aside>

        {/* Mobile drawer */}
        {drawer ? (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setDrawer(false)}
            />
            <div className="absolute top-0 left-0 h-full w-72 overflow-y-auto border-r border-border bg-background px-4">
              {nav(() => setDrawer(false))}
            </div>
          </div>
        ) : null}

        {/* Continuous content */}
        <main className="min-w-0 flex-1 px-0 py-8 lg:px-12">
          {hasFallback ? (
            <div className="mb-6 rounded-lg border border-amber-300/70 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-400/30 dark:bg-amber-500/10 dark:text-amber-300">
              <p className="font-semibold">{t("doc.notTranslatedTitle")}</p>
              <p>{t("doc.notTranslatedBody")}</p>
            </div>
          ) : null}

          <article id="doc-content" className="prose-docs max-w-3xl">
            <JsonLd
              title={`${product.name} – ${audienceLabel}`}
              description={product.description[locale]}
              url={absoluteUrl(`/${productId}/${audienceSegments[audience]}`)}
            />
            <h1>{audienceLabel}</h1>
            {docs.map((doc) => {
              const Doc = doc.Component
              return (
                <section key={doc.slug} aria-labelledby={doc.slug}>
                  <h2 id={doc.slug} data-toc-section className="doc-section">
                    {doc.title}
                  </h2>
                  <Doc components={mdxComponents} />
                </section>
              )
            })}
          </article>
        </main>
      </div>

      <Footer />
    </div>
  )
}
