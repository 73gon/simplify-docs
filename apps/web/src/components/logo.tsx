import { Link } from "@tanstack/react-router"

import { cn } from "@workspace/ui/lib/utils"

/** simplify wordmark + "docs" suffix (Q18). */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn(
        "flex items-center font-semibold tracking-tight",
        className
      )}
      aria-label="simplify docs"
    >
      <span className="text-[0.95rem]">
        simplify <span className="text-primary">docs</span>
      </span>
    </Link>
  )
}
