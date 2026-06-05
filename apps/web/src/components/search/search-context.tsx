import { createContext, useContext, useEffect, useState } from "react"

import { SearchModal } from "@/components/search/search-modal"

type SearchContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  /** Current product id to scope search to (per-product search, Q58/Q77). */
  scope?: string
  setScope: (scope?: string) => void
}

const SearchContext = createContext<SearchContextValue>({
  open: false,
  setOpen: () => {},
  setScope: () => {},
})

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [scope, setScope] = useState<string | undefined>(undefined)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <SearchContext.Provider value={{ open, setOpen, scope, setScope }}>
      {children}
      <SearchModal open={open} onClose={() => setOpen(false)} scope={scope} />
    </SearchContext.Provider>
  )
}

export function useSearch() {
  return useContext(SearchContext)
}
