import { useEffect, useId, useRef, useState } from "react"

/**
 * Client-side Mermaid renderer. During SSR (and before hydration) the diagram
 * source is shown as preformatted text, then replaced with the rendered SVG.
 */
export function Mermaid({ chart }: { chart: string }) {
  const id = useId().replace(/:/g, "")
  const ref = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const isDark = document.documentElement.classList.contains("dark")
    import("mermaid")
      .then(async ({ default: mermaid }) => {
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "neutral",
          securityLevel: "strict",
          fontFamily: "inherit",
        })
        const { svg: rendered } = await mermaid.render(`mmd-${id}`, chart)
        if (!cancelled) setSvg(rendered)
      })
      .catch(() => {
        /* keep the text fallback */
      })
    return () => {
      cancelled = true
    }
  }, [chart, id])

  if (svg) {
    return (
      <div
        ref={ref}
        className="my-5 flex justify-center overflow-x-auto rounded-lg border border-border bg-card p-4"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    )
  }

  return (
    <pre className="my-5 overflow-x-auto rounded-lg border border-border bg-muted p-4 text-xs text-muted-foreground">
      <code>{chart}</code>
    </pre>
  )
}
