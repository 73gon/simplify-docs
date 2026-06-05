import { useSearch } from "@/components/search/search-context"
import { useT } from "@/i18n/context"

export function SearchButton() {
  const { setOpen } = useSearch()
  const t = useT()
  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="flex h-8 w-56 items-center gap-2 rounded-md border border-border bg-muted/40 px-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4 shrink-0"
        aria-hidden
      >
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path
          d="m20 20-3-3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="flex-1 text-left">{t("action.search")}</span>
      <kbd className="rounded border border-border bg-background px-1.5 py-0.5 text-[0.65rem] font-medium">
        ⌘K
      </kbd>
    </button>
  )
}
