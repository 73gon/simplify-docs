import { createFileRoute, notFound } from "@tanstack/react-router"

import { Badge } from "@workspace/ui/components/badge"

import { AppLink } from "@/components/app-link"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { mdxComponents } from "@/components/mdx"
import { getProduct, resolveOverview } from "@/content/registry"
import { audienceSegments } from "@/content/types"
import type { Audience } from "@/content/types"
import { useLocale, useT } from "@/i18n/context"
import { SITE_NAME, absoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/site"

export const Route = createFileRoute("/$product/")({
  head: ({ params }) => {
    const product = getProduct(params.product)
    const url = absoluteUrl(`/${params.product}`)
    const title = product ? `${product.name} · ${SITE_NAME}` : SITE_NAME
    const description = product?.description.de ?? "simplify docs"
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: DEFAULT_OG_IMAGE },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
    }
  },
  component: ProductOverview,
})

function ProductOverview() {
  const { product: productId } = Route.useParams()
  const locale = useLocale()
  const t = useT()

  const product = getProduct(productId)
  if (!product) throw notFound()

  const overview = resolveOverview(productId, locale)
  const Overview = overview?.entry.Component

  const audienceLabel: Record<Audience, string> = {
    user: t("audience.user"),
    config: t("audience.config"),
  }

  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12">
        <nav className="mb-6 text-xs text-muted-foreground">
          <AppLink to="/" className="hover:text-foreground">
            {t("nav.products")}
          </AppLink>
          <span className="px-1">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
          {product.status !== "stable" ? (
            <Badge variant={product.status === "beta" ? "warning" : "muted"}>
              {product.status}
            </Badge>
          ) : null}
        </div>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          {product.description[locale]}
        </p>

        <ul className="mt-8 divide-y divide-border border-y border-border">
          {product.audiences.map((audience) => (
            <li key={audience}>
              <AppLink
                to={`/${productId}/${audienceSegments[audience]}`}
                className="group flex items-center gap-3 py-3.5"
              >
                <span className="font-medium group-hover:text-primary">
                  {audienceLabel[audience]}
                </span>
                <span
                  aria-hidden
                  className="ml-auto text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                >
                  →
                </span>
              </AppLink>
            </li>
          ))}
        </ul>

        {Overview ? (
          <article id="doc-content" className="prose-docs mt-12">
            {overview?.fallback ? (
              <div className="mb-6 rounded-lg border border-amber-300/70 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-400/30 dark:bg-amber-500/10 dark:text-amber-300">
                {t("doc.notTranslatedBody")}
              </div>
            ) : null}
            <Overview components={mdxComponents} />
          </article>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
