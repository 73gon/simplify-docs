export function Steps({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose-docs my-6 ml-3 border-l border-border pl-6 [counter-reset:step]">
      {children}
    </div>
  )
}

export function Step({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="relative mb-6 [counter-increment:step] last:mb-0">
      <span className="absolute -left-[2.30rem] flex size-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground before:content-[counter(step)]" />
      <h4 className="mt-0 mb-1 text-base font-semibold">{title}</h4>
      <div className="[&>:last-child]:mb-0">{children}</div>
    </div>
  )
}
