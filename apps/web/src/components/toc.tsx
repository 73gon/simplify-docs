import { useEffect, useMemo, useState } from "react"

import { cn } from "@workspace/ui/lib/utils"

import { useT } from "@/i18n/context"

type FlatHeading = { id: string; text: string; level: 1 | 2 | 3 }
type TreeNode = FlatHeading & { children: TreeNode[] }

function buildTree(flat: FlatHeading[]): TreeNode[] {
  const roots: TreeNode[] = []
  const stack: TreeNode[] = []
  for (const h of flat) {
    const node: TreeNode = { ...h, children: [] }
    while (stack.length && stack[stack.length - 1].level >= h.level) stack.pop()
    if (stack.length === 0) roots.push(node)
    else stack[stack.length - 1].children.push(node)
    stack.push(node)
  }
  return roots
}

/**
 * Tree "On this page" navigation for the continuous (single-page) manual.
 * Level 1 = document sections, level 2/3 = headings within each section.
 */
export function TableOfContents({ contentKey }: { contentKey: string }) {
  const t = useT()
  const [flat, setFlat] = useState<FlatHeading[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const root = document.getElementById("doc-content")
    if (!root) return
    const nodes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-toc-section], h2, h3")
    ).filter((n) => n.id)

    const items: FlatHeading[] = nodes.map((n) => {
      const isSection = n.hasAttribute("data-toc-section")
      const level: 1 | 2 | 3 = isSection ? 1 : n.tagName === "H2" ? 2 : 3
      return {
        id: n.id,
        text: n.textContent?.replace(/#$/, "").trim() ?? "",
        level,
      }
    })
    setFlat(items)

    if (items.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    )
    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [contentKey])

  const tree = useMemo(() => buildTree(flat), [flat])

  if (flat.length === 0) return null

  return (
    <nav aria-label={t("doc.onThisPage")} className="text-sm">
      <p className="mb-3 px-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {t("doc.onThisPage")}
      </p>
      <ul className="space-y-4">
        {tree.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={cn(
                "block rounded-md px-2 py-1 font-semibold transition-colors",
                activeId === section.id
                  ? "bg-primary/12 text-foreground"
                  : "text-foreground hover:text-primary"
              )}
            >
              {section.text}
            </a>
            {section.children.length > 0 ? (
              <ul className="mt-1 ml-2 space-y-0.5 border-l border-border">
                {section.children.map((child) => (
                  <TreeItem
                    key={child.id}
                    node={child}
                    activeId={activeId}
                    depth={1}
                  />
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  )
}

function TreeItem({
  node,
  activeId,
  depth,
}: {
  node: TreeNode
  activeId: string
  depth: number
}) {
  const active = activeId === node.id
  return (
    <li>
      <a
        href={`#${node.id}`}
        style={{ paddingLeft: `${depth * 0.75 + 0.5}rem` }}
        className={cn(
          "-ml-px block border-l-2 py-1 pr-2 transition-colors",
          active
            ? "border-primary font-medium text-foreground"
            : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
        )}
      >
        {node.text}
      </a>
      {node.children.length > 0 ? (
        <ul className="space-y-0.5">
          {node.children.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              activeId={activeId}
              depth={depth + 1}
            />
          ))}
        </ul>
      ) : null}
    </li>
  )
}
