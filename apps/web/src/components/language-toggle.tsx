import { useRouter } from "@tanstack/react-router"
import { useState } from "react"

import { Button } from "@workspace/ui/components/button"

import { useLocale, useT } from "@/i18n/context"
import { locales, localeLabels } from "@/i18n/messages"
import type { Locale } from "@/i18n/messages"
import { persistLocale } from "@/lib/locale"

export function LanguageToggle() {
  const locale = useLocale()
  const t = useT()
  const router = useRouter()
  const [pending, setPending] = useState(false)

  async function choose(next: Locale) {
    if (next === locale || pending) return
    setPending(true)
    persistLocale(next)
    await router.invalidate()
    setPending(false)
  }

  return (
    <div
      role="group"
      aria-label={t("action.toggleLanguage")}
      className="inline-flex items-center rounded-md border border-border bg-background p-0.5"
    >
      {locales.map((code) => (
        <Button
          key={code}
          variant={code === locale ? "secondary" : "ghost"}
          size="xs"
          disabled={pending}
          onClick={() => choose(code)}
          aria-pressed={code === locale}
          aria-label={localeLabels[code]}
          className="uppercase"
        >
          {code}
        </Button>
      ))}
    </div>
  )
}
