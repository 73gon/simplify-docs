# simplify docs

Documentation website for all simplify-services products — user manuals and
configuration / setup guides. Built with **TanStack Start**, **Bun**, **Base UI +
shadcn**, **Tailwind v4** and **MDX**.

- Brand-matched theme (lime-green `#a0ce4e`), light **and** dark mode
- Bilingual (DE source of truth + EN) with **no `/de` or `/en` URL prefix** —
  language comes from a cookie + `Accept-Language`
- Short, shareable URLs: `docs.simplify-services.de/simptrack/user-manual/uebersicht`
- Per-product search (Pagefind, ⌘K), prerendered pages, SEO + sitemap + JSON-LD

## Monorepo layout

```
apps/web              TanStack Start app (routes, i18n, content engine, chrome)
  content/            MDX docs (per product, per audience, per language)
  scripts/            sitemap generator
packages/ui           @workspace/ui — Base UI + shadcn + MDX component library
```

## Commands (Bun)

```bash
bun install
bun run dev          # dev server on :3000
bun run build        # sitemap + vite build + prerender + pagefind index
bun run typecheck
bun run lint
```

## Build output (self-hosted)

- `apps/web/dist/client` — prerendered HTML + static assets + Pagefind index
- `apps/web/dist/server/server.js` — the SSR server (run with `node`)

```bash
# Docker (from repo root)
docker build -t simplify-docs .
docker run -p 3000:3000 simplify-docs
```

## GitHub Pages

The repository includes a GitHub Actions workflow at
`.github/workflows/deploy.yml`.

On pushes to `main`, the workflow:

1. installs dependencies with Bun,
2. runs typecheck and lint,
3. builds the static site,
4. uploads `apps/web/dist/client` as the GitHub Pages artifact,
5. deploys it with GitHub Pages.

Configure the repository's Pages source to **GitHub Actions**. For production,
set the repository variable `VITE_SITE_URL` to the public origin, for example
`https://docs.simplify-services.de`, so canonical URLs, Open Graph URLs and the
sitemap use the correct host.

This app currently expects to be served from the domain root. Use a custom
domain such as `docs.simplify-services.de` for GitHub Pages. Serving from a
project subpath such as `https://OWNER.github.io/REPO/` requires an additional
base-path configuration pass.

## Authoring docs

See [apps/web/content/AUTHORING.md](apps/web/content/AUTHORING.md) for the content
structure, frontmatter schema and available MDX components.

## Adding shadcn components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@workspace/ui/components/button";
```
