import type { PortableTextBlock } from '@portabletext/react'

export interface SanitySlug {
  current: string
}

export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

export interface Region {
  _id: string
  name: string
  slug: SanitySlug
  state?: string
  elevation?: number
}

export interface Film {
  _id: string
  _type: 'film'
  title: string
  slug: SanitySlug
  publishedAt: string
  youtubeUrl?: string
  thumbnail?: SanityImage
  region?: Region
  duration?: number
  logline?: string
  body?: PortableTextBlock[]
  tripLog?: TripLog
  relatedEssay?: PhotoEssay
  featured?: boolean
}

export interface EssayFrame {
  _key: string
  image: SanityImage
  caption?: string
}

export interface PhotoEssay {
  _id: string
  _type: 'photoEssay'
  title: string
  slug: SanitySlug
  publishedAt: string
  region?: Region
  coverImage?: SanityImage
  intro?: string
  frames?: EssayFrame[]
  closingLine?: string
  relatedFilm?: Film
}

export interface Dispatch {
  _id: string
  _type: 'dispatch'
  title: string
  slug: SanitySlug
  publishedAt: string
  region?: Region
  territory?: string
  body?: PortableTextBlock[]
  relatedFilm?: Film
  featured?: boolean
}

export interface JournalEntry {
  _id: string
  _type: 'journalEntry'
  title: string
  slug: SanitySlug
  publishedAt: string
  region?: Region
  elevation?: number
  temperature?: string
  dayNumber?: number
  format?: 'field-note' | 'night-note' | 'lookback' | 'unglamorous'
  body?: PortableTextBlock[]
  images?: SanityImage[]
  linkedFilm?: Film
  featured?: boolean
}

export interface CostItem {
  _key: string
  category?: string
  amountInr?: number
  note?: string
}

export interface TripLog {
  _id: string
  title: string
  region?: Region
  startDate?: string
  endDate?: string
  totalCostInr?: number
  costBreakdown?: CostItem[]
  gearUsed?: string[]
  conditions?: string
}

export interface StoryFormat {
  _key: string
  label: string
  value: string
  description?: string
}

export interface SiteSettings {
  _id: string
  bio?: string
  featuredFilm?: Film
  youtubeUrl?: string
  instagramUrl?: string
  storyFormats?: StoryFormat[]
}

// Union type for archive page — all content types that appear in the feed
export type AnyPiece = Film | PhotoEssay | Dispatch | JournalEntry

export interface ArchivePiece {
  _id: string
  _type: string
  title: string
  slug: SanitySlug
  publishedAt: string
  region?: Region
}
