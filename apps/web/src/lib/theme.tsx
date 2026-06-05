import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"
type ResolvedTheme = "light" | "dark"

type ThemeContextValue = {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
  toggle: () => void
}

const STORAGE_KEY = "theme"

const ThemeContext = createContext<ThemeContextValue>({
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => {},
  toggle: () => {},
})

/**
 * Inline script that runs before paint to set the `.dark` class from the saved
 * preference or the system setting — prevents a flash of the wrong theme.
 */
export const themeScript = `
(function(){try{
var s=localStorage.getItem("${STORAGE_KEY}");
var m=window.matchMedia("(prefers-color-scheme: dark)").matches;
var d=s==="dark"||((!s||s==="system")&&m);
document.documentElement.classList.toggle("dark",d);
}catch(e){}})();
`

function systemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system")
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light")

  useEffect(() => {
    const saved =
      (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? "system"
    setThemeState(saved)
  }, [])

  useEffect(() => {
    const resolved = theme === "system" ? systemTheme() : theme
    setResolvedTheme(resolved)
    document.documentElement.classList.toggle("dark", resolved === "dark")

    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)")
      const handler = () => {
        const next = mq.matches ? "dark" : "light"
        setResolvedTheme(next)
        document.documentElement.classList.toggle("dark", next === "dark")
      }
      mq.addEventListener("change", handler)
      return () => mq.removeEventListener("change", handler)
    }
  }, [theme])

  function setTheme(next: Theme) {
    localStorage.setItem(STORAGE_KEY, next)
    setThemeState(next)
  }

  function toggle() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
