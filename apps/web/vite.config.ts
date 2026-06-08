import { defineConfig } from "vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import mdx from "@mdx-js/rollup"
import remarkFrontmatter from "remark-frontmatter"
import remarkMdxFrontmatter from "remark-mdx-frontmatter"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeShiki from "@shikijs/rehype"
import { readdirSync, statSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const appDir = dirname(fileURLToPath(import.meta.url))
const contentDir = join(appDir, "content")
const segmentToAudience = { "user-manual": "user", "config-guide": "config" }

function safeReaddir(dir: string) {
  try {
    return readdirSync(dir)
  } catch {
    return []
  }
}

function getPrerenderPages() {
  const paths = new Set(["/"])

  for (const product of safeReaddir(contentDir)) {
    const productDir = join(contentDir, product)
    try {
      if (!statSync(productDir).isDirectory()) continue
    } catch {
      continue
    }

    paths.add(`/${product}`)

    for (const audienceSegment of Object.keys(segmentToAudience)) {
      const audienceDir = join(productDir, audienceSegment)
      const files = safeReaddir(audienceDir).filter((file) =>
        /\.[a-z]{2}\.mdx$/.test(file)
      )
      if (files.length === 0) continue

      paths.add(`/${product}/${audienceSegment}`)

      for (const file of files) {
        const slug = file.replace(/\.[a-z]{2}\.mdx$/, "")
        paths.add(`/${product}/${audienceSegment}/${slug}`)
      }
    }
  }

  return [...paths].sort().map((path) => ({
    path,
    prerender: { enabled: true },
  }))
}

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tailwindcss(),
    {
      enforce: "pre",
      ...mdx({
        providerImportSource: "@mdx-js/react",
        remarkPlugins: [
          remarkGfm,
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: "frontmatter" }],
        ],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "append",
              properties: {
                className: ["heading-anchor"],
                ariaHidden: true,
                tabIndex: -1,
              },
              content: { type: "text", value: "#" },
            },
          ],
          [
            rehypeShiki,
            {
              themes: { light: "github-light", dark: "github-dark" },
              defaultColor: false,
            },
          ],
        ],
      }),
    },
    tanstackStart({
      prerender: { enabled: true, crawlLinks: true },
      pages: getPrerenderPages(),
    }),
    viteReact({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
  ],
})

export default config
