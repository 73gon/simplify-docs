// Lightweight, fully-typed message catalog (compile-time safe).
// German is the source of truth; English is the secondary translation.
// No URL locale prefix — the active locale is resolved from cookie + Accept-Language.

export const locales = ["de", "en"] as const
export type Locale = (typeof locales)[number]

/** German = source of truth and final fallback (see architecture Q22). */
export const defaultLocale: Locale = "de"

export function isLocale(value: unknown): value is Locale {
  return (
    typeof value === "string" && (locales as readonly string[]).includes(value)
  )
}

export const localeLabels: Record<Locale, string> = {
  de: "Deutsch",
  en: "English",
}

type Messages = {
  "site.title": string
  "site.tagline": string
  "nav.docs": string
  "nav.products": string
  "nav.home": string
  "action.search": string
  "action.searchPlaceholder": string
  "action.toggleTheme": string
  "action.toggleLanguage": string
  "action.menu": string
  "catalog.title": string
  "catalog.subtitle": string
  "catalog.searchProducts": string
  "catalog.noResults": string
  "category.widgets": string
  "category.system-activities": string
  "audience.user": string
  "audience.config": string
  "product.openUserManual": string
  "product.openConfigGuide": string
  "product.version": string
  "product.languages": string
  "product.liveDemo": string
  "doc.onThisPage": string
  "doc.prev": string
  "doc.next": string
  "doc.updated": string
  "doc.appliesTo": string
  "doc.notTranslatedTitle": string
  "doc.notTranslatedBody": string
  "doc.userManual": string
  "doc.configGuide": string
  "search.empty": string
  "search.noResults": string
  "search.hint": string
  "notFound.title": string
  "notFound.body": string
  "notFound.back": string
  "footer.rights": string
  "footer.imprint": string
  "footer.privacy": string
  "footer.builtBy": string
  "callout.note": string
  "callout.tip": string
  "callout.warning": string
  "callout.danger": string
  "callout.info": string
}

const de: Messages = {
  "site.title": "simplify docs",
  "site.tagline":
    "Handbücher und Entwicklerleitfäden für simplify-services Produkte",
  "nav.docs": "Dokumentation",
  "nav.products": "Produkte",
  "nav.home": "Start",
  "action.search": "Suchen",
  "action.searchPlaceholder": "Dokumentation durchsuchen…",
  "action.toggleTheme": "Design wechseln",
  "action.toggleLanguage": "Sprache wechseln",
  "action.menu": "Menü",
  "catalog.title": "Produktdokumentation",
  "catalog.subtitle":
    "Benutzerhandbücher, Einrichtungs- und Konfigurationsleitfäden für alle simplify-services Produkte.",
  "catalog.searchProducts": "Produkte suchen…",
  "catalog.noResults": "Keine Produkte gefunden.",
  "category.widgets": "Widgets",
  "category.system-activities": "Systemaktivitäten",
  "audience.user": "Benutzerhandbuch",
  "audience.config": "Konfiguration",
  "product.openUserManual": "Benutzerhandbuch öffnen",
  "product.openConfigGuide": "Konfiguration öffnen",
  "product.version": "Version",
  "product.languages": "Sprachen",
  "product.liveDemo": "Live-Demo",
  "doc.onThisPage": "Auf dieser Seite",
  "doc.prev": "Zurück",
  "doc.next": "Weiter",
  "doc.updated": "Aktualisiert",
  "doc.appliesTo": "Gilt für",
  "doc.notTranslatedTitle": "Noch nicht übersetzt",
  "doc.notTranslatedBody":
    "Diese Seite ist in der gewählten Sprache noch nicht verfügbar und wird in der Originalsprache angezeigt.",
  "doc.userManual": "Benutzerhandbuch",
  "doc.configGuide": "Konfiguration",
  "search.empty": "Beginnen Sie zu tippen, um zu suchen.",
  "search.noResults": "Keine Ergebnisse.",
  "search.hint": "zum Suchen",
  "notFound.title": "Seite nicht gefunden",
  "notFound.body": "Die angeforderte Seite konnte nicht gefunden werden.",
  "notFound.back": "Zur Übersicht",
  "footer.rights": "Alle Rechte vorbehalten.",
  "footer.imprint": "Impressum",
  "footer.privacy": "Datenschutz",
  "footer.builtBy": "Ein Service der simplify services GmbH",
  "callout.note": "Hinweis",
  "callout.tip": "Tipp",
  "callout.warning": "Warnung",
  "callout.danger": "Achtung",
  "callout.info": "Info",
}

const en: Messages = {
  "site.title": "simplify docs",
  "site.tagline":
    "User manuals and developer guides for simplify-services products",
  "nav.docs": "Documentation",
  "nav.products": "Products",
  "nav.home": "Home",
  "action.search": "Search",
  "action.searchPlaceholder": "Search the documentation…",
  "action.toggleTheme": "Toggle theme",
  "action.toggleLanguage": "Switch language",
  "action.menu": "Menu",
  "catalog.title": "Product documentation",
  "catalog.subtitle":
    "User manuals, setup and configuration guides for every simplify-services product.",
  "catalog.searchProducts": "Search products…",
  "catalog.noResults": "No products found.",
  "category.widgets": "Widgets",
  "category.system-activities": "System Activities",
  "audience.user": "User manual",
  "audience.config": "Configuration",
  "product.openUserManual": "Open user manual",
  "product.openConfigGuide": "Open configuration",
  "product.version": "Version",
  "product.languages": "Languages",
  "product.liveDemo": "Live demo",
  "doc.onThisPage": "On this page",
  "doc.prev": "Previous",
  "doc.next": "Next",
  "doc.updated": "Updated",
  "doc.appliesTo": "Applies to",
  "doc.notTranslatedTitle": "Not yet translated",
  "doc.notTranslatedBody":
    "This page is not yet available in the selected language and is shown in its original language.",
  "doc.userManual": "User manual",
  "doc.configGuide": "Configuration",
  "search.empty": "Start typing to search.",
  "search.noResults": "No results.",
  "search.hint": "to search",
  "notFound.title": "Page not found",
  "notFound.body": "The requested page could not be found.",
  "notFound.back": "Back to overview",
  "footer.rights": "All rights reserved.",
  "footer.imprint": "Imprint",
  "footer.privacy": "Privacy",
  "footer.builtBy": "A service by simplify services GmbH",
  "callout.note": "Note",
  "callout.tip": "Tip",
  "callout.warning": "Warning",
  "callout.danger": "Caution",
  "callout.info": "Info",
}

export const catalogs: Record<Locale, Messages> = { de, en }

export type MessageKey = keyof Messages

export function getCatalog(locale: Locale): Messages {
  return catalogs[locale] ?? catalogs[defaultLocale]
}

/** Translate a key for a locale, falling back to the default locale. */
export function translate(locale: Locale, key: MessageKey): string {
  return getCatalog(locale)[key] ?? getCatalog(defaultLocale)[key] ?? key
}

/**
 * Negotiate a locale from a raw Accept-Language header.
 * Returns the first supported language, otherwise the German fallback.
 */
export function negotiateLocale(
  acceptLanguage: string | null | undefined
): Locale {
  if (!acceptLanguage) return defaultLocale
  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=")
      return { tag: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 }
    })
    .sort((a, b) => b.q - a.q)
  for (const { tag } of ranked) {
    if (isLocale(tag)) return tag
  }
  return defaultLocale
}
