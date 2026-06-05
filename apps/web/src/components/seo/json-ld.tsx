import { SITE_NAME } from "@/lib/site"

/** Emits TechArticle JSON-LD structured data (Q115). */
export function JsonLd({
  title,
  description,
  url,
  updated,
}: {
  title: string
  description?: string
  url: string
  updated?: string
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url,
    ...(updated ? { dateModified: updated } : {}),
    publisher: {
      "@type": "Organization",
      name: "simplify services GmbH",
    },
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url },
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
