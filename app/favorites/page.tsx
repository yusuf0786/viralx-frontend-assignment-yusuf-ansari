"use client"

import type React from "react"

import { useMemo, useState } from "react"
import { useFavorites } from "@/lib/stores/favorites-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Trash2, ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function FavoritesPage() {
  const router = useRouter()
  const { favorites, remove, setCategory } = useFavorites()
  const [newFolder, setNewFolder] = useState("")
  const [folders, setFolders] = useState<string[]>(["All", "Funny", "Motivation"])
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const categories = useMemo(() => {
    const set = new Set<string>(folders)
    favorites.forEach((f) => f.category && set.add(f.category))
    return Array.from(set)
  }, [favorites, folders])

  const filteredFavorites = useMemo(() => {
    if (selectedCategory === "All") return favorites
    const sel = selectedCategory.toLowerCase()
    return favorites.filter((f) => (f.category?.toLowerCase() ?? "") === sel)
  }, [favorites, selectedCategory])

  const onCategoryActivate = (c: string) => setSelectedCategory(c)
  const onBadgeKeyDown = (e: React.KeyboardEvent, c: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      setSelectedCategory(c)
    }
  }

  const addFolder = () => {
    if (!newFolder.trim()) return
    if (!folders.includes(newFolder.trim())) setFolders((f) => [...f, newFolder.trim()])
    setNewFolder("")
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="mb-6">
        <Button variant="ghost" size="sm" aria-label="Go back" onClick={() => router.back()} className="mb-2">
          <ChevronLeft className="mr-1 h-4 w-4" aria-hidden="true" />
          Back
        </Button>
        <h1 className="text-balance text-2xl font-semibold">Script Vault</h1>
        <p className="text-sm text-muted-foreground">Your saved reels and edited scripts.</p>
      </header>

      <section className="mb-6 grid gap-3">
        <div className="grid gap-2 sm:max-w-sm">
          <Label htmlFor="folder">Create folder/category</Label>
          <div className="flex items-center gap-2">
            <Input
              id="folder"
              placeholder='e.g., "Hooks", "How-Tos"'
              value={newFolder}
              onChange={(e) => setNewFolder(e.target.value)}
            />
            <Button onClick={addFolder} className="bg-primary hover:bg-primary-hover text-white">
              Add
            </Button>
          </div>
        </div>
      </section>

      <Tabs defaultValue="grid">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>

          <div className="flex flex-wrap items-center gap-2">
            {categories.map((c) => (
              <Badge
                key={c}
                role="button"
                tabIndex={0}
                aria-pressed={selectedCategory === c}
                onClick={() => onCategoryActivate(c)}
                onKeyDown={(e) => onBadgeKeyDown(e, c)}
                variant={selectedCategory === c ? "default" : "secondary"}
                className="cursor-pointer"
                title={selectedCategory === c ? `Selected: ${c}` : `Filter by ${c}`}
              >
                {c}
              </Badge>
            ))}
          </div>
        </div>

        <TabsContent value="grid">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFavorites.map((f) => (
              <Card key={f.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-pretty text-base">{f.title}</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={f.thumbnailUrl || "/placeholder.svg"}
                    alt={f.title}
                    className="h-40 w-full rounded-md object-cover"
                  />
                  <p className="line-clamp-3 text-sm text-muted-foreground">{f.content}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{f.niche}</Badge>
                    {f.category && <Badge>{f.category}</Badge>}
                  </div>
                </CardContent>
                <CardFooter className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`cat-${f.id}`} className="text-xs text-muted-foreground">
                      Folder
                    </Label>
                    <input
                      id={`cat-${f.id}`}
                      className="w-28 rounded border border-slate-200 bg-background px-2 py-1 text-xs outline-none dark:border-slate-800"
                      value={f.category ?? ""}
                      placeholder="Set folder"
                      onChange={(e) => setCategory(f.id, e.target.value || undefined)}
                    />
                  </div>
                  <Button variant="ghost" size="icon" aria-label="Remove" onClick={() => remove(f.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
            {filteredFavorites.length === 0 && (
              <p className="col-span-full text-sm text-muted-foreground">
                {selectedCategory === "All"
                  ? "No saved scripts yet. Go to Discover and save one."
                  : "No scripts in this folder yet."}
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <div className="grid gap-2">
            {filteredFavorites.map((f) => (
              <div
                key={f.id}
                className="grid grid-cols-[80px_1fr_auto] items-center gap-3 rounded-md border border-slate-200 bg-background p-2 dark:border-slate-800"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.thumbnailUrl || "/placeholder.svg"}
                  alt={f.title}
                  className="h-16 w-20 rounded object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{f.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{f.content}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{f.niche}</Badge>
                    {f.category && <Badge>{f.category}</Badge>}
                  </div>
                </div>
                <Button variant="ghost" size="icon" aria-label="Remove" onClick={() => remove(f.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {filteredFavorites.length === 0 && (
              <p className="text-sm text-muted-foreground">
                {selectedCategory === "All" ? "Empty. Save scripts from Discover." : "No scripts in this folder yet."}
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}
