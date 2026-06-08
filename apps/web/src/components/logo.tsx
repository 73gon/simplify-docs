import { Link } from "@tanstack/react-router"

import { cn } from "@workspace/ui/lib/utils"

/** simplify wordmark + "docs" suffix (Q18). */
export function Logo({
  className,
  productName,
}: {
  className?: string
  productName?: string
}) {
  return (
    <div className={cn("flex items-center gap-1 font-semibold", className)}>
      <Link
        to="/"
        className="tracking-tight hover:text-primary"
        aria-label="simplify docs"
      >
        <span className="text-[0.95rem]">
          simplify <span className="text-primary">docs</span>
        </span>
      </Link>
      {productName ? (
        <>
          <span className="text-muted-foreground" aria-hidden>
            /
          </span>
          <span className="text-[0.95rem] tracking-tight">{productName}</span>
        </>
      ) : null}
    </div>
  )
}
