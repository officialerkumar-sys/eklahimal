import { groq } from 'next-sanity'
import { safeFetch } from '../client'
import type { JournalEntry } from '@/types/sanity'

const REGION_FRAGMENT = groq`region->{ _id, name, slug, state }`

const EXPEDITION_FRAGMENT = groq`expedition->{ _id, title, slug, linkedFilm->{ _id, title, slug } }`

const JOURNAL_LIST_FRAGMENT = groq`
  _id, _type, title, slug, publishedAt, format, dayNumber, elevation, temperature, lat, lon,
  ${REGION_FRAGMENT},
  ${EXPEDITION_FRAGMENT},
  "excerpt": pt::text(body)[0..300]
`

const JOURNAL_FULL_FRAGMENT = groq`
  _id, _type, title, slug, publishedAt, format, dayNumber, elevation, temperature, lat, lon,
  ${REGION_FRAGMENT}, body, images,
  ${EXPEDITION_FRAGMENT},
  linkedFilm->{ _id, title, slug }
`

export async function getJournalEntries(): Promise<JournalEntry[]> {
  return (await safeFetch<JournalEntry[]>(
    groq`*[_type == "journalEntry" && defined(slug.current)] | order(publishedAt desc) { ${JOURNAL_LIST_FRAGMENT} }`
  )) ?? []
}

export async function getJournalEntryBySlug(slug: string): Promise<JournalEntry | null> {
  return safeFetch<JournalEntry>(
    groq`*[_type == "journalEntry" && slug.current == $slug][0] { ${JOURNAL_FULL_FRAGMENT} }`,
    { slug }
  )
}

export async function getRecentJournalEntries(limit = 3): Promise<JournalEntry[]> {
  return (await safeFetch<JournalEntry[]>(
    groq`*[_type == "journalEntry" && defined(slug.current)] | order(publishedAt desc) [0...$limit] { ${JOURNAL_LIST_FRAGMENT} }`,
    { limit }
  )) ?? []
}

export async function getAllJournalSlugs(): Promise<{ slug: { current: string } }[]> {
  return (await safeFetch<{ slug: { current: string } }[]>(
    groq`*[_type == "journalEntry" && defined(slug.current)]{ slug }`
  )) ?? []
}

export async function getExpeditions(): Promise<import('@/types/sanity').Expedition[]> {
  return (await safeFetch<import('@/types/sanity').Expedition[]>(
    groq`*[_type == "expedition"] | order(order asc, year desc) {
      _id, title, slug, year,
      region->{ _id, name },
      linkedFilm->{ _id, title, slug }
    }`
  )) ?? []
}
