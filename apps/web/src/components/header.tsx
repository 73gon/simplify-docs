import { Button } from "@workspace/ui/components/button"

import { LanguageToggle } from "@/components/language-toggle"
import { Logo } from "@/components/logo"
import { SearchButton } from "@/components/search/search-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useT } from "@/i18n/context"

export function Header({ onMenu }: { onMenu?: () => void }) {
  const t = useT()
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center gap-3 px-4">
        {onMenu ? (
          <Button
            variant="ghost"
            size="icon-sm"
            className="lg:hidden"
            onClick={onMenu}
            aria-label={t("action.menu")}
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden>
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </Button>
        ) : null}

        <Logo />

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:block">
            <SearchButton />
          </div>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
