import { groq } from 'next-sanity'
import { client, safeFetch } from '../client'
import type { Film } from '@/types/sanity'

const REGION_FRAGMENT = groq`region->{ _id, name, slug, state }`

const FILM_CARD_FRAGMENT = groq`
  _id, _type, title, slug, publishedAt, logline, duration,
  thumbnail, ${REGION_FRAGMENT}
`

const FILM_FULL_FRAGMENT = groq`
  _id, _type, title, slug, publishedAt, youtubeUrl, logline, duration,
  thumbnail, ${REGION_FRAGMENT}, body,
  tripLog->{ _id, title, startDate, endDate, totalCostInr, costBreakdown, gearUsed, conditions },
  relatedEssay->{ _id, title, slug, coverImage }
`

export async function getFilms(page = 1, perPage = 8): Promise<Film[]> {
  const start = (page - 1) * perPage
  const end = start + perPage
  return (await safeFetch<Film[]>(
    groq`*[_type == "film" && defined(slug.current)] | order(publishedAt desc) [${start}...${end}] { ${FILM_CARD_FRAGMENT} }`
  )) ?? []
}

export async function getFilmsCount(): Promise<number> {
  return (await safeFetch<number>(groq`count(*[_type == "film" && defined(slug.current)])`)) ?? 0
}

export async function getFilmBySlug(slug: string): Promise<Film | null> {
  return safeFetch<Film>(
    groq`*[_type == "film" && slug.current == $slug][0] { ${FILM_FULL_FRAGMENT} }`,
    { slug }
  )
}

export async function getFeaturedFilm(): Promise<Film | null> {
  return safeFetch<Film>(
    groq`*[_type == "siteSettings"][0].featuredFilm->{ ${FILM_FULL_FRAGMENT} }`
  )
}

export async function getRecentFilms(limit = 3): Promise<Film[]> {
  return (await safeFetch<Film[]>(
    groq`*[_type == "film" && defined(slug.current)] | order(publishedAt desc) [0...$limit] { ${FILM_CARD_FRAGMENT} }`,
    { limit }
  )) ?? []
}

export async function getAllFilmSlugs(): Promise<{ slug: { current: string } }[]> {
  return (await safeFetch<{ slug: { current: string } }[]>(
    groq`*[_type == "film" && defined(slug.current)]{ slug }`
  )) ?? []
}
