"use client"

import useSWR, { mutate } from "swr"

const KEY = "viralx:likes"
type LikesState = { liked: string[]; skipped: string[] }

function read(): LikesState {
  if (typeof window === "undefined") return { liked: [], skipped: [] }
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as LikesState) : { liked: [], skipped: [] }
  } catch {
    return { liked: [], skipped: [] }
  }
}
function write(next: LikesState) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next))
  } catch {}
}

export function useLikes() {
  const { data } = useSWR<LikesState>(KEY, () => Promise.resolve(read()), {
    fallbackData: { liked: [], skipped: [] },
    revalidateOnFocus: false,
  })
  const state = data ?? { liked: [], skipped: [] }

  const like = (id: string) => {
    const next = { ...state, liked: Array.from(new Set([...state.liked, id])) }
    write(next)
    mutate(KEY, next, false)
  }
  const skip = (id: string) => {
    const next = { ...state, skipped: Array.from(new Set([...state.skipped, id])) }
    write(next)
    mutate(KEY, next, false)
  }

  return { liked: state.liked, skipped: state.skipped, like, skip }
}
