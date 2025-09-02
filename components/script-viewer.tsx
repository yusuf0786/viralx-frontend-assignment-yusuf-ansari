"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useFavorites } from "@/lib/stores/favorites-store"
import type { Reel } from "@/lib/types"

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  reel: Reel | null
}

export function ScriptViewer({ open, onOpenChange, reel }: Props) {
  const { add } = useFavorites()
  const [tone, setTone] = useState("Professional")
  const [language, setLanguage] = useState("English")
  const [content, setContent] = useState(reel?.transcript ?? "")
  const [category, setCategory] = useState("")

  // keep editor content updated when reel changes
  useMemo(() => {
    setContent(reel?.transcript ?? "")
    setCategory("")
  }, [reel])

  const saveScript = () => {
    if (!reel) return
    const item = {
      id: `fav-${reel.id}-${Date.now()}`,
      reelId: reel.id,
      title: reel.title,
      niche: reel.niche,
      content: `[${tone} • ${language}] ${content}`.trim(),
      thumbnailUrl: reel.thumbnailUrl,
      category: category || undefined,
      createdAt: new Date().toISOString(),
    }
    add(item)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-pretty">Script Viewer & Editor</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger id="tone" aria-label="Select tone">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Funny">Funny</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Casual">Casual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language" aria-label="Select language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="Hinglish">Hinglish</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category (optional)</Label>
              <Input
                id="category"
                placeholder='e.g., "Funny", "Motivation"'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="editor">Transcript</Label>
            <Textarea
              id="editor"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="resize-y"
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button onClick={saveScript} variant="primary">
              Save to Vault
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
