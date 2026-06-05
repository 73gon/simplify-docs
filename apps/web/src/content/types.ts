import type { ComponentType } from "react"

import type { Locale } from "@/i18n/messages"

export type ProductCategory = "widgets" | "system-activities"

export type ProductStatus = "stable" | "beta" | "deprecated"

/** Audience for a documentation tree (hard separation per architecture Q44). */
export type Audience = "user" | "config"

/** URL segment <-> audience mapping. URLs stay language-independent (Q35). */
export const audienceSegments: Record<Audience, string> = {
  user: "user-manual",
  config: "config-guide",
}

export const segmentToAudience: Record<string, Audience> = {
  "user-manual": "user",
  "config-guide": "config",
}

/** A product registry entry (typed manifest, Q53). */
export type ProductMeta = {
  id: string
  name: string
  category: ProductCategory
  /** Short description per locale, shown in the catalog (Q55). */
  description: Record<Locale, string>
  version: string
  languages: Locale[]
  status: ProductStatus
  /** Which audiences this product ships docs for. */
  audiences: Audience[]
  order?: number
}

export type DocFrontmatter = {
  title: string
  slug?: string
  order?: number
  description?: string
  updated?: string
  appliesTo?: string
  status?: "draft" | "published"
}

export type DocEntry = {
  product: string
  audience: Audience
  slug: string
  locale: Locale
  title: string
  description?: string
  order: number
  updated?: string
  appliesTo?: string
  Component: ComponentType<{ components?: Record<string, unknown> }>
}

export type ResolvedDoc = {
  entry: DocEntry
  /** True when the requested locale was missing and another locale is shown. */
  fallback: boolean
}

export type OverviewEntry = {
  product: string
  locale: Locale
  Component: ComponentType<{ components?: Record<string, unknown> }>
}
