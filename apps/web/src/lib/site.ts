/** Canonical site origin (no trailing slash). Override via VITE_SITE_URL. */
export const SITE_URL =
  (import.meta.env?.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") ??
  "https://docs.simplify-services.de"

export const SITE_NAME = "simplify docs"

/** Static branded social-share image (Q116). Swap for a dynamic one if desired. */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og.svg`

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}
