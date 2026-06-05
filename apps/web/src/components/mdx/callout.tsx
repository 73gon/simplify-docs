import { cn } from "@workspace/ui/lib/utils"

import { useT } from "@/i18n/context"
import type { MessageKey } from "@/i18n/messages"

type CalloutType = "note" | "tip" | "warning" | "danger" | "info"

function Glyph({ type }: { type: CalloutType }) {
  const common = "size-5 shrink-0"
  if (type === "tip") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M20 6 9 17l-5-5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  if (type === "warning" || type === "danger") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 9v4m0 4h.01M10.3 3.9 2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 11v5m0-8h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

const styles: Record<
  CalloutType,
  { label: MessageKey; box: string; icon: string }
> = {
  note: {
    label: "callout.note",
    box: "border-border bg-muted/50",
    icon: "text-muted-foreground",
  },
  tip: {
    label: "callout.tip",
    box: "border-[color-mix(in_oklch,var(--primary),transparent_55%)] bg-[color-mix(in_oklch,var(--primary),transparent_88%)]",
    icon: "text-[color-mix(in_oklch,var(--primary),var(--foreground)_30%)]",
  },
  info: {
    label: "callout.info",
    box: "border-sky-300/60 bg-sky-50 dark:border-sky-400/30 dark:bg-sky-500/10",
    icon: "text-sky-600 dark:text-sky-400",
  },
  warning: {
    label: "callout.warning",
    box: "border-amber-300/70 bg-amber-50 dark:border-amber-400/30 dark:bg-amber-500/10",
    icon: "text-amber-600 dark:text-amber-400",
  },
  danger: {
    label: "callout.danger",
    box: "border-destructive/40 bg-destructive/8 dark:bg-destructive/12",
    icon: "text-destructive",
  },
}

export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: CalloutType
  title?: string
  children: React.ReactNode
}) {
  const t = useT()
  const s = styles[type] ?? styles.note
  return (
    <div className={cn("my-5 flex gap-3 rounded-lg border p-4 text-sm", s.box)}>
      <span className={cn("mt-0.5", s.icon)}>
        <Glyph type={type} />
      </span>
      <div className="min-w-0 [&>:last-child]:mb-0 [&>p]:mb-2">
        <p className="mb-1 font-semibold">{title ?? t(s.label)}</p>
        {children}
      </div>
    </div>
  )
}
