import { createContext, useContext, useMemo } from "react"

import { defaultLocale, translate } from "@/i18n/messages"
import type { Locale, MessageKey } from "@/i18n/messages"

type I18nContextValue = {
  locale: Locale
  t: (key: MessageKey) => string
}

const I18nContext = createContext<I18nContextValue>({
  locale: defaultLocale,
  t: (key) => translate(defaultLocale, key),
})

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale
  children: React.ReactNode
}) {
  const value = useMemo<I18nContextValue>(
    () => ({ locale, t: (key) => translate(locale, key) }),
    [locale]
  )
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  return useContext(I18nContext)
}

export function useLocale(): Locale {
  return useContext(I18nContext).locale
}

/** Convenience translate hook: `const t = useT(); t("nav.docs")`. */
export function useT() {
  return useContext(I18nContext).t
}
