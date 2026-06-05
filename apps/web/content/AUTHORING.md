# Authoring guide

How documentation content is structured for the simplify docs site.

## Where content lives

```
content/<product>/
  meta.ts                     # product registry entry (typed)
  product.de.mdx              # overview body (German, source of truth)
  product.en.mdx              # overview body (English)
  user-manual/<slug>.<lang>.mdx
  config-guide/<slug>.<lang>.mdx
```

- `<lang>` is `de` (source of truth) or `en`.
- The two audiences map to URL segments: `user-manual` and `config-guide`.
- URLs are language-independent: the active language comes from a cookie /
  `Accept-Language`, never from the URL.

## Frontmatter

Every page begins with YAML frontmatter:

```yaml
---
title: Übersicht # shown as H1 and in navigation
slug: uebersicht # STABLE, identical across languages → drives the URL
order: 1 # sidebar ordering
updated: 2026-06-05 # last-updated date
appliesTo: SimpTrack 1.0 # version label
description: Kurztext # used for SEO + search
status: published # "draft" pages are excluded from the build
---
```

The matching `.de` and `.en` files **must share the same `slug`** so the URL is
identical in both languages.

## Available MDX components

| Component                                           | Purpose                            |
| --------------------------------------------------- | ---------------------------------- |
| `<Callout type="note\|tip\|info\|warning\|danger">` | Admonition box                     |
| `<Steps>` / `<Step title="…">`                      | Numbered procedure                 |
| `<Tabs>` / `<Tab label="…">`                        | Tabbed content                     |
| `<ParamTable rows={[…]} />`                         | Config / parameter reference table |
| `<Mermaid chart={`…`} />`                           | Diagram (rendered client-side)     |
| `<ImageZoom src alt caption />`                     | Image with lightbox                |
| `<Video src title />`                               | Responsive video embed             |
| `<SimpTrackDemo />`                                 | Live demo table (SimpTrack)        |

Code fences are highlighted at build time (Shiki, dual light/dark theme) and get
an automatic copy button.

## Adding a new product

1. Create `content/<product>/meta.ts` exporting a `ProductMeta`.
2. Add `product.de.mdx` + `product.en.mdx` overview bodies.
3. Add pages under `user-manual/` and/or `config-guide/`.
4. The catalog, sidebar, search index and sitemap pick it up automatically.
