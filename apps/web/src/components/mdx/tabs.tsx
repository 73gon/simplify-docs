import { Children, isValidElement, useId, useState } from "react"

import { cn } from "@workspace/ui/lib/utils"

type TabProps = { label: string; children: React.ReactNode }

export function Tab({ children }: TabProps) {
  return <>{children}</>
}

export function Tabs({ children }: { children: React.ReactNode }) {
  const id = useId()
  const tabs = Children.toArray(children).filter(
    isValidElement
  ) as React.ReactElement<TabProps>[]
  const [active, setActive] = useState(0)

  if (tabs.length === 0) return null

  return (
    <div className="my-5 overflow-hidden rounded-lg border border-border">
      <div
        role="tablist"
        className="flex gap-1 border-b border-border bg-muted/40 p-1"
      >
        {tabs.map((tab, i) => (
          <button
            key={i}
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={active === i}
            aria-controls={`${id}-panel-${i}`}
            onClick={() => setActive(i)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              active === i
                ? "bg-background text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.props.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div
          key={i}
          role="tabpanel"
          id={`${id}-panel-${i}`}
          aria-labelledby={`${id}-tab-${i}`}
          hidden={active !== i}
          className="prose-docs p-4 [&>:last-child]:mb-0"
        >
          {tab.props.children}
        </div>
      ))}
    </div>
  )
}
