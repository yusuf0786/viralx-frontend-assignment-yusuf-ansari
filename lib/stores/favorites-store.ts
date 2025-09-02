"use client"

import useSWR, { mutate } from "swr"
import type { SavedScript } from "../types"

const KEY = "viralx:favorites"

function read(): SavedScript[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as SavedScript[]) : []
  } catch {
    return []
  }
}
function write(next: SavedScript[]) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next))
  } catch {}
}

export function useFavorites() {
  const { data } = useSWR<SavedScript[]>(KEY, () => Promise.resolve(read()), {
    fallbackData: [],
    revalidateOnFocus: false,
  })
  const favorites = data ?? []

  const add = (item: SavedScript) => {
    const exists = favorites.some((f) => f.id === item.id)
    const next = exists ? favorites.map((f) => (f.id === item.id ? item : f)) : [...favorites, item]
    write(next)
    mutate(KEY, next, false)
  }

  const remove = (id: string) => {
    const next = favorites.filter((f) => f.id !== id)
    write(next)
    mutate(KEY, next, false)
  }

  const setCategory = (id: string, category?: string) => {
    const next = favorites.map((f) => (f.id === id ? { ...f, category } : f))
    write(next)
    mutate(KEY, next, false)
  }

  return { favorites, add, remove, setCategory }
}
