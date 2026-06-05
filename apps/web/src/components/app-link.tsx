import { Link } from "@tanstack/react-router"

type AppLinkProps = Omit<React.ComponentProps<typeof Link>, "to"> & {
  /** A plain string path (e.g. "/simptrack/user-manual/uebersicht"). */
  to: string
}

/**
 * Thin wrapper around the router `Link` that accepts arbitrary string paths.
 * Doc URLs are content-driven, so the strictly-typed route union of the router
 * does not know them ahead of time — this keeps call sites simple and typesafe.
 */
export function AppLink({ to, ...props }: AppLinkProps) {
  return <Link to={to} {...props} />
}
