import { createFileRoute } from "@tanstack/react-router"
import { useMemo, useState } from "react"

import { Badge } from "@workspace/ui/components/badge"

import { AppLink } from "@/components/app-link"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { products } from "@/content/registry"
import type { ProductCategory } from "@/content/types"
import { useLocale, useT } from "@/i18n/context"

export const Route = createFileRoute("/")({ component: Catalog })

const categoryOrder: ProductCategory[] = ["widgets", "system-activities"]

function Catalog() {
  const t = useT()
  const locale = useLocale()
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return products
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description[locale]?.toLowerCase().includes(q)
    )
  }, [query, locale])

  const grouped = useMemo(() => {
    const map = new Map<ProductCategory, typeof products>()
    for (const p of filtered) {
      const list = map.get(p.category) ?? []
      list.push(p)
      map.set(p.category, list)
    }
    return map
  }, [filtered])

  const categories = [
    ...categoryOrder.filter((c) => grouped.has(c)),
    ...[...grouped.keys()].filter((c) => !categoryOrder.includes(c)),
  ]

  return (
    <div className="flex min-h-svh flex-col">
      <Header />
      <main className="mx-auto w-full max-w-screen-2xl flex-1 px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("catalog.title")}
          </h1>
          <p className="mt-3 text-muted-foreground">{t("catalog.subtitle")}</p>
          <div className="mx-auto mt-6 flex max-w-md items-center gap-2 rounded-lg border border-border bg-card px-3">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="size-4 text-muted-foreground"
              aria-hidden
            >
              <circle
                cx="11"
                cy="11"
                r="7"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="m20 20-3-3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("catalog.searchProducts")}
              className="h-11 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-sm text-muted-foreground">
            {t("catalog.noResults")}
          </p>
        ) : (
          <div className="mt-12 space-y-10">
            {categories.map((category) => (
              <section key={category}>
                <h2 className="mb-2 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                  {t(`category.${category}`)}
                </h2>
                <ul className="divide-y divide-border border-y border-border">
                  {grouped.get(category)?.map((product) => (
                    <li key={product.id}>
                      <AppLink
                        to={`/${product.id}`}
                        className="group flex items-baseline gap-3 py-3.5 transition-colors"
                      >
                        <span className="font-semibold tracking-tight group-hover:text-primary">
                          {product.name}
                        </span>
                        {product.status !== "stable" ? (
                          <Badge
                            variant={
                              product.status === "beta" ? "warning" : "muted"
                            }
                          >
                            {product.status}
                          </Badge>
                        ) : null}
                        <span className="ml-auto hidden text-sm text-muted-foreground sm:block">
                          {product.description[locale]}
                        </span>
                        <span
                          aria-hidden
                          className="text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                        >
                          →
                        </span>
                      </AppLink>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
