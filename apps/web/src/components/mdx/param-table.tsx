export type ParamRow = {
  name: string
  type?: string
  required?: boolean
  default?: string
  description: string
}

/** Renders a configuration / parameter reference table (Q47). */
export function ParamTable({ rows }: { rows: ParamRow[] }) {
  return (
    <div className="my-5 overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-muted text-left">
            <th className="px-3 py-2 font-semibold">Key</th>
            <th className="px-3 py-2 font-semibold">Typ</th>
            <th className="px-3 py-2 font-semibold">Default</th>
            <th className="px-3 py-2 font-semibold">Beschreibung</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-t border-border align-top">
              <td className="px-3 py-2">
                <code className="rounded bg-muted px-1.5 py-0.5 text-[0.8em]">
                  {row.name}
                </code>
                {row.required ? (
                  <span className="ml-1 text-[0.7em] font-semibold text-destructive">
                    *
                  </span>
                ) : null}
              </td>
              <td className="px-3 py-2 text-muted-foreground">
                {row.type ?? "—"}
              </td>
              <td className="px-3 py-2 text-muted-foreground">
                {row.default ? (
                  <code className="text-[0.8em]">{row.default}</code>
                ) : (
                  "—"
                )}
              </td>
              <td className="px-3 py-2">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
