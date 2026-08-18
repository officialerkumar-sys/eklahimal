import { groq } from 'next-sanity'
import { safeFetch } from '../client'
import type { Dispatch } from '@/types/sanity'

const REGION_FRAGMENT = groq`region->{ _id, name, slug, state }`

const DISPATCH_CARD_FRAGMENT = groq`
  _id, _type, title, slug, publishedAt, territory, ${REGION_FRAGMENT},
  "excerpt": pt::text(body)[0..200]
`

const DISPATCH_FULL_FRAGMENT = groq`
  _id, _type, title, slug, publishedAt, territory, ${REGION_FRAGMENT}, body,
  relatedFilm->{ _id, title, slug, thumbnail }
`

export async function getDispatches(): Promise<Dispatch[]> {
  return (await safeFetch<Dispatch[]>(
    groq`*[_type == "dispatch" && defined(slug.current)] | order(publishedAt desc) { ${DISPATCH_CARD_FRAGMENT} }`
  )) ?? []
}

export async function getDispatchBySlug(slug: string): Promise<Dispatch | null> {
  return safeFetch<Dispatch>(
    groq`*[_type == "dispatch" && slug.current == $slug][0] { ${DISPATCH_FULL_FRAGMENT} }`,
    { slug }
  )
}

export async function getRecentDispatches(limit = 3): Promise<Dispatch[]> {
  return (await safeFetch<Dispatch[]>(
    groq`*[_type == "dispatch" && defined(slug.current)] | order(publishedAt desc) [0...$limit] { ${DISPATCH_CARD_FRAGMENT} }`,
    { limit }
  )) ?? []
}

export async function getAllDispatchSlugs(): Promise<{ slug: { current: string } }[]> {
  return (await safeFetch<{ slug: { current: string } }[]>(
    groq`*[_type == "dispatch" && defined(slug.current)]{ slug }`
  )) ?? []
}
