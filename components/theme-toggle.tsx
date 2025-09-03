"use client"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import * as React from "react"

type Props = {
  className?: string
}

export function ThemeToggle({ className }: Props) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Avoid reading theme on server to prevent mismatch; render nothing until mounted
    return <div className={cn(className)} />
  }

  const isDark = resolvedTheme === "dark"

  function handleToggle() {
    console.log("[v0] ThemeToggle click:", { resolvedTheme, to: isDark ? "light" : "dark" })
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <div className={cn(className)}>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggle}
        aria-pressed={isDark}
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        title={isDark ? "Switch to light" : "Switch to dark"}
        className="transition-colors"
      >
        {isDark ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  )
}
