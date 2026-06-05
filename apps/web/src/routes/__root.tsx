import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router"

import appCss from "@workspace/ui/globals.css?url"

import { SearchProvider } from "@/components/search/search-context"
import { I18nProvider } from "@/i18n/context"
import { defaultLocale } from "@/i18n/messages"
import { getLocale } from "@/lib/locale-rpc"
import { DEFAULT_OG_IMAGE, SITE_NAME } from "@/lib/site"
import { ThemeProvider, themeScript } from "@/lib/theme"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "simplify docs" },
      {
        name: "description",
        content:
          "Benutzerhandbücher und Konfigurationsleitfäden für simplify-services Produkte.",
      },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0097A9" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "manifest", href: "/manifest.json" },
    ],
    scripts: import.meta.env.PROD
      ? [
          {
            src: "https://plausible.io/js/script.js",
            defer: true,
            "data-domain": "docs.simplify-services.de",
          },
        ]
      : [],
  }),
  loader: async () => {
    const locale = await getLocale().catch(() => defaultLocale)
    return { locale }
  },
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const { locale } = Route.useLoaderData()
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          <I18nProvider locale={locale}>
            <SearchProvider>{children}</SearchProvider>
          </I18nProvider>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}

function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 p-6 text-center">
      <p className="text-5xl font-bold text-primary">404</p>
      <h1 className="text-xl font-semibold">Seite nicht gefunden</h1>
      <p className="text-sm text-muted-foreground">
        Die angeforderte Seite konnte nicht gefunden werden.
      </p>
      <Link
        to="/"
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
      >
        Zur Übersicht
      </Link>
    </main>
  )
}
