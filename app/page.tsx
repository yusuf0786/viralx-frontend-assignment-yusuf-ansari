"use client"

import { useState } from "react"
import { SwipeDeck } from "@/components/swipe/swipe-deck"
import { ScriptViewer } from "@/components/script-viewer"
import type { Reel } from "@/lib/types"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Page() {
  const [viewerOpen, setViewerOpen] = useState(false)
  const [activeReel, setActiveReel] = useState<Reel | null>(null)

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-4 sm:mb-6 flex items-center justify-between">
        <h1 className="text-balance text-sm md:text-4xl font-semibold me-3">VIRALX • Discover</h1>
        <nav className="flex items-center gap-2">
          <Link href="/favorites">
            <Button variant="outline">Script Vault</Button>
          </Link>
          <Link href="/competitors">
            <Button variant="ghost">Competitors</Button>
          </Link>
        </nav>
      </header>

      <SwipeDeck
        onOpenScript={(reel) => {
          setActiveReel(reel)
          setViewerOpen(true)
        }}
      />

      <ScriptViewer open={viewerOpen} onOpenChange={setViewerOpen} reel={activeReel} />
    </main>
  )
}
