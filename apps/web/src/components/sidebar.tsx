import { AppLink } from "@/components/app-link"
import { cn } from "@workspace/ui/lib/utils"

import { useT } from "@/i18n/context"
import type { Audience, ProductMeta } from "@/content/types"
import { audienceSegments } from "@/content/types"

/** Compact product header + audience switch shown above the tree TOC. */
export function Sidebar({
  product,
  audience,
  audiences,
  onNavigate,
}: {
  product: ProductMeta
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
      <div className="px-1">
        <AppLink
          to={`/${product.id}`}
          onClick={onNavigate}
          className="text-sm font-semibold tracking-tight hover:text-primary"
        >
          {product.name}
        </AppLink>
      </div>

      {audiences.length > 1 ? (
        <div className="flex rounded-lg border border-border bg-muted/40 p-0.5">
          {audiences.map((a) => (
            <AppLink
              key={a}
              to={`/${product.id}/${audienceSegments[a]}`}
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
