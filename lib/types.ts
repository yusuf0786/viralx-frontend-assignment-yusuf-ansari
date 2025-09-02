export type Reel = {
  id: string
  title: string
  niche: string
  thumbnailUrl: string
  transcript: string
}

export type SavedScript = {
  id: string
  reelId: string
  title: string
  niche: string
  content: string
  thumbnailUrl: string
  category?: string
  createdAt: string
}

export type CompetitorReel = {
  id: string
  creator: string
  title: string
  thumbnailUrl: string
  likes: number
  views: number
  shares: number
  postedAt: string
}
