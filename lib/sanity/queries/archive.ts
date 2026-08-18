import { groq } from 'next-sanity'
import { safeFetch } from '../client'
import type { ArchivePiece } from '@/types/sanity'

const PIECE_FRAGMENT = groq`_id, _type, title, slug, publishedAt, region->{ _id, name, slug }`

export async function getAllPieces(regionSlug?: string): Promise<ArchivePiece[]> {
  const regionFilter = regionSlug
    ? groq`&& region->slug.current == $regionSlug`
    : ''

  const params = regionSlug ? { regionSlug } : {}

  const [films, essays, dispatches, journal] = await Promise.all([
    safeFetch<ArchivePiece[]>(
      groq`*[_type == "film" ${regionFilter}] | order(publishedAt desc) { ${PIECE_FRAGMENT} }`,
      params
    ),
    safeFetch<ArchivePiece[]>(
      groq`*[_type == "photoEssay" ${regionFilter}] | order(publishedAt desc) { ${PIECE_FRAGMENT} }`,
      params
    ),
    safeFetch<ArchivePiece[]>(
      groq`*[_type == "dispatch" ${regionFilter}] | order(publishedAt desc) { ${PIECE_FRAGMENT} }`,
      params
    ),
    safeFetch<ArchivePiece[]>(
      groq`*[_type == "journalEntry" ${regionFilter}] | order(publishedAt desc) { ${PIECE_FRAGMENT} }`,
      params
    ),
  ])

  const all = [...(films ?? []), ...(essays ?? []), ...(dispatches ?? []), ...(journal ?? [])]
  return all.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export async function getAllRegions() {
  return (await safeFetch<{ _id: string; name: string; slug: { current: string } }[]>(
    groq`*[_type == "region"] | order(name asc) { _id, name, slug }`
  )) ?? []
}
