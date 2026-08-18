import { groq } from 'next-sanity'
import { safeFetch } from '../client'
import type { AnyPiece, Film } from '@/types/sanity'

const PIECE_FRAGMENT = groq`_id, _type, title, slug, publishedAt, logline`

export async function getHomepageData(): Promise<{
  featuredFilm: Film | null
  recentPieces: AnyPiece[]
}> {
  const data = await safeFetch<{
    featuredFilm: Film | null
    films: AnyPiece[]
    essays: AnyPiece[]
    dispatches: AnyPiece[]
    journal: AnyPiece[]
  }>(groq`{
    "featuredFilm": *[_type == "siteSettings"][0].featuredFilm->{
      _id, _type, title, slug, publishedAt, youtubeUrl, logline, duration,
      thumbnail, region->{ _id, name, slug }
    },
    "films": *[_type == "film"] | order(publishedAt desc) [0...3] {
      ${PIECE_FRAGMENT}, thumbnail, region->{ name, slug }
    },
    "essays": *[_type == "photoEssay"] | order(publishedAt desc) [0...3] {
      ${PIECE_FRAGMENT}, coverImage, intro, region->{ name, slug }
    },
    "dispatches": *[_type == "dispatch"] | order(publishedAt desc) [0...3] {
      ${PIECE_FRAGMENT}, region->{ name, slug }
    },
    "journal": *[_type == "journalEntry"] | order(publishedAt desc) [0...3] {
      ${PIECE_FRAGMENT}, region->{ name, slug }
    }
  }`)

  if (!data) return { featuredFilm: null, recentPieces: [] }

  const all: AnyPiece[] = [
    ...data.films,
    ...data.essays,
    ...data.dispatches,
    ...data.journal,
  ]
  const recentPieces = all
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3)

  return { featuredFilm: data.featuredFilm, recentPieces }
}
