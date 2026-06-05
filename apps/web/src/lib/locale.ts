import { defaultLocale, isLocale } from "@/i18n/messages"
import type { Locale } from "@/i18n/messages"

export const LOCALE_COOKIE = "locale"
const ONE_YEAR = 60 * 60 * 24 * 365

/** Persist a manual language choice in a cookie (client-side, no round-trip). */
export function persistLocale(locale: Locale): void {
  if (typeof document === "undefined") return
  const value = isLocale(locale) ? locale : defaultLocale
  document.cookie = `${LOCALE_COOKIE}=${value}; path=/; max-age=${ONE_YEAR}; samesite=lax`
}
