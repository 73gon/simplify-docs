import { useT } from "@/i18n/context"

const IMPRINT_URL = "https://www.simplify-services.de/impressum/"
const PRIVACY_URL = "https://www.simplify-services.de/impressum/"

/** Minimal footer with German legal links (Q69, Q119). */
export function Footer() {
  const t = useT()
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
        <p>
          © {year} simplify services GmbH. {t("footer.rights")}
        </p>
        <nav className="flex items-center gap-4 sm:ml-auto">
          <a
            href={IMPRINT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            {t("footer.imprint")}
          </a>
          <a
            href={PRIVACY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            {t("footer.privacy")}
          </a>
        </nav>
      </div>
    </footer>
  )
}
