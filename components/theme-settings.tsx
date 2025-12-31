"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Palette, LogIn, AlertTriangle } from "lucide-react"
import { themes, type ThemeName } from "@/lib/themes"
import { useRouter } from "next/navigation"

interface ThemeSettingsProps {
  onClose: () => void
  showTestMode?: boolean
  testMode?: boolean
  onTestModeChange?: (enabled: boolean) => void
  onFillRandomly?: () => void
}

const colorPresets = [
  { name: "purple", value: "oklch(0.65 0.18 310)" },
  { name: "blue", value: "oklch(0.60 0.20 240)" },
  { name: "green", value: "oklch(0.50 0.18 160)" },
  { name: "yellow", value: "oklch(0.75 0.15 90)" },
  { name: "orange", value: "oklch(0.65 0.18 50)" },
  { name: "red", value: "oklch(0.60 0.20 25)" },
  { name: "pink", value: "oklch(0.68 0.22 10)" },
  { name: "cyan", value: "oklch(0.55 0.20 200)" },
]

export function ThemeSettings({
  onClose,
  showTestMode = false,
  testMode = false,
  onTestModeChange,
  onFillRandomly,
}: ThemeSettingsProps) {
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>("twilight")
  const [customColors, setCustomColors] = useState({
    primary: "oklch(0.65 0.18 310)",
    accent: "oklch(0.3 0.05 330)",
    background: "oklch(0.15 0.03 280)",
  })
  const router = useRouter()

  useEffect(() => {
    const saved = localStorage.getItem("mlp-theme") as ThemeName
    if (saved && themes[saved]) {
      setSelectedTheme(saved)
    }
    const savedCustom = localStorage.getItem("mlp-custom-colors")
    if (savedCustom) {
      setCustomColors(JSON.parse(savedCustom))
    }
  }, [])

  const applyTheme = (themeName: ThemeName) => {
    const theme = themes[themeName]
    const root = document.documentElement

    const colors =
      themeName === "custom"
        ? {
            ...theme.colors,
            primary: customColors.primary,
            accent: customColors.accent,
            background: customColors.background,
          }
        : theme.colors

    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })

    localStorage.setItem("mlp-theme", themeName)
    localStorage.setItem("mlp-theme-manual", "true")
    setSelectedTheme(themeName)
  }

  const handleCustomColorChange = (key: keyof typeof customColors, value: string) => {
    const newColors = { ...customColors, [key]: value }
    setCustomColors(newColors)
    localStorage.setItem("mlp-custom-colors", JSON.stringify(newColors))

    // auto-apply if custom theme is selected
    if (selectedTheme === "custom") {
      const root = document.documentElement
      root.style.setProperty(`--${key}`, value)
    }
  }

  const parseOklch = (oklch: string) => {
    const match = oklch.match(/oklch$$([\d.]+)\s+([\d.]+)\s+([\d.]+)$$/)
    if (match) {
      return {
        l: Number.parseFloat(match[1]),
        c: Number.parseFloat(match[2]),
        h: Number.parseFloat(match[3]),
      }
    }
    return { l: 0.5, c: 0.1, h: 280 }
  }

  const buildOklch = (l: number, c: number, h: number) => {
    return `oklch(${l.toFixed(2)} ${c.toFixed(2)} ${h.toFixed(0)})`
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 bg-card border-2 border-primary/30">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Palette className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">theme settings</h2>
          </div>
          <Button onClick={onClose} variant="ghost" size="icon" className="hover:bg-accent">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="mb-6">
          <Button
            onClick={() => router.push("/auth/login")}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
          >
            <LogIn className="w-4 h-4 mr-2" />
            login / sign up
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {Object.entries(themes).map(([key, theme]) => (
            <button
              key={key}
              onClick={() => applyTheme(key as ThemeName)}
              className={`
                p-4 rounded-lg border-2 transition-all hover:scale-105
                ${
                  selectedTheme === key
                    ? "border-primary bg-primary/10 shadow-lg"
                    : "border-border bg-card hover:border-primary/50"
                }
              `}
            >
              <div className="aspect-square mb-3 rounded-lg overflow-hidden flex gap-1">
                <div style={{ backgroundColor: theme.colors.primary }} className="flex-1" />
                <div style={{ backgroundColor: theme.colors.accent }} className="flex-1" />
                <div style={{ backgroundColor: theme.colors.background }} className="flex-1" />
              </div>
              <p className="text-sm font-medium text-foreground text-center">
                {key === "plasmadabs" ? "plasmadabs" : theme.name}
              </p>
            </button>
          ))}
        </div>

        {selectedTheme === "custom" && (
          <Card className="mb-6 p-4 bg-accent/20 border-2 border-accent">
            <h3 className="font-bold text-foreground mb-4">customize colors</h3>

            {/* color presets */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">quick presets:</p>
              <div className="flex flex-wrap gap-2">
                {colorPresets.map((preset) => (
                  <button
                    key={preset.name}
                    onClick={() => handleCustomColorChange("primary", preset.value)}
                    className="w-8 h-8 rounded-full border-2 border-border hover:border-primary transition-all"
                    style={{ backgroundColor: preset.value }}
                    title={preset.name}
                  />
                ))}
              </div>
            </div>

            {/* primary color slider */}
            <div className="mb-4">
              <label className="text-sm font-medium text-foreground mb-2 block">primary color</label>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-muted-foreground">lightness</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={parseOklch(customColors.primary).l}
                    onChange={(e) => {
                      const { c, h } = parseOklch(customColors.primary)
                      handleCustomColorChange("primary", buildOklch(Number.parseFloat(e.target.value), c, h))
                    }}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">chroma</label>
                  <input
                    type="range"
                    min="0"
                    max="0.4"
                    step="0.01"
                    value={parseOklch(customColors.primary).c}
                    onChange={(e) => {
                      const { l, h } = parseOklch(customColors.primary)
                      handleCustomColorChange("primary", buildOklch(l, Number.parseFloat(e.target.value), h))
                    }}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">hue</label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="1"
                    value={parseOklch(customColors.primary).h}
                    onChange={(e) => {
                      const { l, c } = parseOklch(customColors.primary)
                      handleCustomColorChange("primary", buildOklch(l, c, Number.parseFloat(e.target.value)))
                    }}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* accent color slider */}
            <div className="mb-4">
              <label className="text-sm font-medium text-foreground mb-2 block">accent color</label>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-muted-foreground">lightness</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={parseOklch(customColors.accent).l}
                    onChange={(e) => {
                      const { c, h } = parseOklch(customColors.accent)
                      handleCustomColorChange("accent", buildOklch(Number.parseFloat(e.target.value), c, h))
                    }}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">chroma</label>
                  <input
                    type="range"
                    min="0"
                    max="0.4"
                    step="0.01"
                    value={parseOklch(customColors.accent).c}
                    onChange={(e) => {
                      const { l, h } = parseOklch(customColors.accent)
                      handleCustomColorChange("accent", buildOklch(l, Number.parseFloat(e.target.value), h))
                    }}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">hue</label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="1"
                    value={parseOklch(customColors.accent).h}
                    onChange={(e) => {
                      const { l, c } = parseOklch(customColors.accent)
                      handleCustomColorChange("accent", buildOklch(l, c, Number.parseFloat(e.target.value)))
                    }}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* background color slider */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">background color</label>
              <div className="space-y-2">
                <div>
                  <label className="text-xs text-muted-foreground">lightness</label>
                  <input
                    type="range"
                    min="0"
                    max="0.3"
                    step="0.01"
                    value={parseOklch(customColors.background).l}
                    onChange={(e) => {
                      const { c, h } = parseOklch(customColors.background)
                      handleCustomColorChange("background", buildOklch(Number.parseFloat(e.target.value), c, h))
                    }}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">hue</label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="1"
                    value={parseOklch(customColors.background).h}
                    onChange={(e) => {
                      const { l, c } = parseOklch(customColors.background)
                      handleCustomColorChange("background", buildOklch(l, c, Number.parseFloat(e.target.value)))
                    }}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </Card>
        )}

        {showTestMode && (
          <Card className="mb-6 p-4 bg-destructive/10 border-2 border-destructive">
            <div className="flex items-start gap-3 mb-3">
              <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-bold text-destructive mb-1">test mode</h3>
                <p className="text-sm text-destructive/80">do not touch unless you know what you are doing</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={testMode}
                  onChange={(e) => onTestModeChange?.(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-destructive/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-destructive"></div>
              </label>
              {testMode && (
                <Button onClick={onFillRandomly} size="sm" variant="destructive" className="font-medium">
                  fill all randomly
                </Button>
              )}
            </div>
          </Card>
        )}

        <div className="mt-6 p-4 bg-accent/20 rounded-lg border-2 border-accent">
          <p className="text-sm text-foreground/80 text-center">
            your theme preference will be saved and applied across all pages
          </p>
        </div>
      </Card>
    </div>
  )
}
