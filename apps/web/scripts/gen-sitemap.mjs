// Generates public/sitemap.xml by scanning the content folder.
// Run before build (see package.json "prebuild"). Uses only Node built-ins.
import { readdirSync, statSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const SITE_URL = (
  process.env.VITE_SITE_URL || "https://docs.simplify-services.de"
).replace(/\/$/, "")
const CONTENT_DIR = join(process.cwd(), "content")

const audienceSegments = { user: "user-manual", config: "config-guide" }
const segmentToAudience = { "user-manual": "user", "config-guide": "config" }

/** @type {Set<string>} */
const paths = new Set(["/"])

function safeReaddir(dir) {
  try {
    return readdirSync(dir)
  } catch {
    return []
  }
}

for (const product of safeReaddir(CONTENT_DIR)) {
  const productDir = join(CONTENT_DIR, product)
  if (!statSync(productDir).isDirectory()) continue
  paths.add(`/${product}`)

  // One continuous page per audience that has at least one MDX file.
  for (const audienceSegment of Object.keys(segmentToAudience)) {
    const audienceDir = join(productDir, audienceSegment)
    const hasDocs = safeReaddir(audienceDir).some((f) =>
      /\.[a-z]{2}\.mdx$/.test(f)
    )
    if (hasDocs) paths.add(`/${product}/${audienceSegment}`)
  }
}

void audienceSegments // referenced for clarity

const now = new Date().toISOString()
const urls = [...paths]
  .sort()
  .map(
    (p) =>
      `  <url><loc>${SITE_URL}${p}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq></url>`
  )
  .join("\n")

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

writeFileSync(join(process.cwd(), "public", "sitemap.xml"), xml)
console.log(`sitemap.xml written with ${paths.size} URLs`)
