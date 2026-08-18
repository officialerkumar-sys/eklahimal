import { groq } from 'next-sanity'
import { safeFetch } from '../client'
import type { PhotoEssay } from '@/types/sanity'

const REGION_FRAGMENT = groq`region->{ _id, name, slug, state }`

const ESSAY_CARD_FRAGMENT = groq`
  _id, _type, title, slug, publishedAt, intro, coverImage, ${REGION_FRAGMENT}
`

const ESSAY_FULL_FRAGMENT = groq`
  _id, _type, title, slug, publishedAt, intro, coverImage, closingLine,
  ${REGION_FRAGMENT},
  frames[]{ _key, image, caption },
  relatedFilm->{ _id, title, slug, thumbnail }
`

export async function getEssays(): Promise<PhotoEssay[]> {
  return (await safeFetch<PhotoEssay[]>(
    groq`*[_type == "photoEssay"] | order(publishedAt desc) { ${ESSAY_CARD_FRAGMENT} }`
  )) ?? []
}

export async function getEssayBySlug(slug: string): Promise<PhotoEssay | null> {
  return safeFetch<PhotoEssay>(
    groq`*[_type == "photoEssay" && slug.current == $slug][0] { ${ESSAY_FULL_FRAGMENT} }`,
    { slug }
  )
}

export async function getRecentEssays(limit = 3): Promise<PhotoEssay[]> {
  return (await safeFetch<PhotoEssay[]>(
    groq`*[_type == "photoEssay"] | order(publishedAt desc) [0...$limit] { ${ESSAY_CARD_FRAGMENT} }`,
    { limit }
  )) ?? []
}

export async function getAllEssaySlugs(): Promise<{ slug: { current: string } }[]> {
  return (await safeFetch<{ slug: { current: string } }[]>(groq`*[_type == "photoEssay"]{ slug }`)) ?? []
}
