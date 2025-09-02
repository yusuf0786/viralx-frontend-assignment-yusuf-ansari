"use client"

import { useMemo, useState, useRef } from "react"
import { motion, type PanInfo, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, Bookmark, X } from "lucide-react"
import { ReelCard } from "../reel-card"
import { reels as defaultReels } from "@/lib/data/reels"
import type { Reel } from "@/lib/types"
import { useLikes } from "@/lib/stores/likes-store"

type Props = {
  onOpenScript: (reel: Reel) => void
  items?: Reel[]
}

export function SwipeDeck({ onOpenScript, items = defaultReels }: Props) {
  const [index, setIndex] = useState(0)
  const { like, skip } = useLikes()
  const current = items[index] ?? null

  const goNext = () => setIndex((i) => Math.min(i + 1, items.length))
  const draggedRef = useRef(false)

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x
    if (offset > 120 && current) {
      like(current.id)
      goNext()
    } else if (offset < -120 && current) {
      skip(current.id)
      goNext()
    }
    setTimeout(() => {
      draggedRef.current = false
    }, 200)
  }

  const stack = useMemo(() => items.slice(index, index + 3), [items, index])

  if (!current) {
    return (
      <div className="grid place-items-center gap-4 p-8 text-center">
        <p className="text-muted-foreground">You’ve reached the end. Come back later for more reels.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      <div className="relative h-[590px] sm:h-[650px] md:h-[650px]">
        <AnimatePresence>
          {stack.map((reel, i) => {
            const isTop = i === 0
            return (
              <motion.div
                key={reel.id}
                className="absolute inset-0"
                style={{ zIndex: 10 - i }}
                initial={{ scale: 0.96 + i * 0.02, y: i * 8, opacity: 0 }}
                animate={{ scale: 1 - i * 0.02, y: i * 8, opacity: 1 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <motion.div
                  drag={isTop ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragStart={() => {
                    draggedRef.current = false
                  }}
                  onDrag={(_, info) => {
                    const d = Math.hypot(info.offset.x, info.offset.y)
                    if (d > 6) draggedRef.current = true
                  }}
                  onDragEnd={handleDragEnd}
                  className="h-full"
                  whileDrag={{ rotate: isTop ? (0 as number) : 0, cursor: "grabbing" }}
                >
                  <button
                    className="h-full w-full text-left"
                    aria-label={`Open ${reel.title} script`}
                    onClick={(e) => {
                      if (draggedRef.current) {
                        e.preventDefault()
                        e.stopPropagation()
                        return
                      }
                      onOpenScript(reel)
                    }}
                  >
                    <ReelCard title={reel.title} niche={reel.niche} thumbnailUrl={reel.thumbnailUrl} />
                  </button>
                </motion.div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-3">
        <Button
          variant="outline"
          className="h-12 w-12 rounded-full p-0 bg-transparent"
          aria-label="Skip"
          onClick={() => {
            if (!current) return
            skip(current.id)
            goNext()
          }}
        >
          <X className="h-5 w-5" />
        </Button>
        <Button
          className="h-12 w-12 rounded-full p-0"
          aria-label="Like"
          onClick={() => {
            if (!current) return
            like(current.id)
            goNext()
          }}
        >
          <Heart className="h-5 w-5" />
        </Button>
        <Button
          variant="secondary"
          className="h-12 w-12 rounded-full p-0"
          aria-label="Save"
          onClick={() => current && onOpenScript(current)}
        >
          <Bookmark className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
