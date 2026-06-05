import { createServerFn } from "@tanstack/react-start"
import { getRequest } from "@tanstack/react-start/server"

import { isLocale, negotiateLocale } from "@/i18n/messages"
import type { Locale } from "@/i18n/messages"
import { LOCALE_COOKIE } from "@/lib/locale"

function readCookie(header: string | null, name: string): string | undefined {
  if (!header) return undefined
  for (const part of header.split(";")) {
    const [k, ...v] = part.trim().split("=")
    if (k === name) return decodeURIComponent(v.join("="))
  }
  return undefined
}

/**
 * Server function (RPC bridge) that resolves the active locale with a clean,
 * prefix-free URL:
 *   1. explicit cookie choice  →  2. Accept-Language negotiation  →  3. German fallback.
 */
export const getLocale = createServerFn({ method: "GET" }).handler(
  async (): Promise<Locale> => {
    const request = getRequest()
    const cookie = readCookie(
      request?.headers.get("cookie") ?? null,
      LOCALE_COOKIE
    )
    if (isLocale(cookie)) return cookie
    return negotiateLocale(request?.headers.get("accept-language") ?? null)
  }
)
