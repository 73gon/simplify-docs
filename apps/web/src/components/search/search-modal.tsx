import { useNavigate } from "@tanstack/react-router"
import { useEffect, useMemo, useRef, useState } from "react"

import { getSearchEntries } from "@/content/registry"
import type { SearchEntry } from "@/content/registry"
import { useLocale, useT } from "@/i18n/context"

function highlight(text: string, query: string) {
  const i = text.toLowerCase().indexOf(query.toLowerCase())
  if (i === -1 || !query) return text
  return (
    <>
      {text.slice(0, i)}
      <mark className="bg-primary/25 text-foreground">
        {text.slice(i, i + query.length)}
      </mark>
      {text.slice(i + query.length)}
    </>
  )
}

export function SearchModal({
  open,
  onClose,
  scope,
}: {
  open: boolean
  onClose: () => void
  scope?: string
}) {
  const t = useT()
  const locale = useLocale()
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)

  const index = useMemo(() => getSearchEntries(locale), [locale])

  useEffect(() => {
    if (open) {
      setQuery("")
      setActive(0)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  const audienceLabel = (audience: SearchEntry["audience"]) =>
    t(audience === "user" ? "audience.user" : "audience.config")

  const hits = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (term.length < 1) return []
    const scoped = scope ? index.filter((e) => e.product === scope) : index
    return scoped
      .map((e) => {
        if (!e.haystack.includes(term)) return null
        const score = e.title.toLowerCase().includes(term) ? 0 : 1
        return { entry: e, score }
      })
      .filter((x): x is { entry: SearchEntry; score: number } => x !== null)
      .sort((a, b) => a.score - b.score)
      .slice(0, 12)
      .map((x) => x.entry)
  }, [query, index, scope])

  useEffect(() => {
    setActive(0)
  }, [query])

  function go(entry: SearchEntry | undefined) {
    if (!entry) return
    onClose()
    const [path, hash] = entry.url.split("#")
    navigate({ to: path, hash })
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, hits.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      go(hits[active])
    }
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("action.search")}
      className="fixed inset-0 z-100 flex items-start justify-center bg-black/50 p-4 pt-[12vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-popover shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-border px-4">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="size-4 text-muted-foreground"
            aria-hidden
          >
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="m20 20-3-3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={t("action.searchPlaceholder")}
            className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 text-[0.65rem] text-muted-foreground">
            esc
          </kbd>
        </div>

        {query.trim().length < 1 ? (
          <p className="px-4 py-8 text-center text-sm text-muted-foreground">
            {t("search.empty")}
          </p>
        ) : hits.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-muted-foreground">
            {t("search.noResults")}
          </p>
        ) : (
          <ul className="max-h-80 overflow-y-auto p-2">
            {hits.map((hit, i) => (
              <li key={`${hit.url}-${i}`}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(hit)}
                  className={`flex w-full flex-col gap-0.5 rounded-md px-3 py-2 text-left transition-colors ${
                    i === active ? "bg-primary/12" : "hover:bg-muted"
                  }`}
                >
                  <span className="text-sm font-medium">
                    {highlight(hit.title, query.trim())}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    {scope ? null : (
                      <>
                        <span>{hit.productName}</span>
                        <span aria-hidden>·</span>
                      </>
                    )}
                    <span>{audienceLabel(hit.audience)}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
