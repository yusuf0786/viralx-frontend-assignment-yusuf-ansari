"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

type BackButtonProps = {
  label?: string
  className?: string
}

export function BackButton({ label = "Back", className }: BackButtonProps) {
  const router = useRouter()
  return (
    <Button variant="ghost" size="sm" onClick={() => router.back()} className={className} aria-label="Go back">
      <ChevronLeft className="mr-1 h-4 w-4" aria-hidden="true" />
      <span className="text-sm">{label}</span>
    </Button>
  )
}
