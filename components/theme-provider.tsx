"use client"

import { useEffect, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import { themes, type ThemeName } from "@/lib/themes"

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const pathname = usePathname()

  useEffect(() => {
    const manualSelection = localStorage.getItem("mlp-theme-manual")
    const savedTheme = localStorage.getItem("mlp-theme") as ThemeName

    let themeToApply: ThemeName

    if (manualSelection === "true" && savedTheme && themes[savedTheme]) {
      themeToApply = savedTheme
    } else {
      if (pathname?.startsWith("/mlptest")) {
        themeToApply = "twilight"
      } else {
        themeToApply = "plasmadabs"
      }
    }

    const theme = themes[themeToApply]
    const root = document.documentElement

    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })
  }, [pathname])

  return <>{children}</>
}
