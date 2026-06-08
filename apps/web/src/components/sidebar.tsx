import { AppLink } from "@/components/app-link"
import { cn } from "@workspace/ui/lib/utils"

import { useT } from "@/i18n/context"
import type { Audience } from "@/content/types"
import { audienceSegments } from "@/content/types"

/** Compact product header + audience switch shown above the tree TOC. */
export function Sidebar({
  productId,
  audience,
  audiences,
  onNavigate,
}: {
  productId: string
  audience: Audience
  audiences: Audience[]
  onNavigate?: () => void
}) {
  const t = useT()
  const audienceLabel: Record<Audience, string> = {
    user: t("audience.user"),
    config: t("audience.config"),
  }

  return (
    <div className="flex flex-col gap-4">
      {audiences.length > 1 ? (
        <div className="flex rounded-lg border border-border bg-muted/40 p-0.5">
          {audiences.map((a) => (
            <AppLink
              key={a}
              to={`/${productId}/${audienceSegments[a]}`}
              onClick={onNavigate}
              className={cn(
                "flex-1 rounded-md px-2 py-1.5 text-center text-xs font-medium transition-colors",
                a === audience
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {audienceLabel[a]}
            </AppLink>
          ))}
        </div>
      ) : null}
    </div>
  )
}
