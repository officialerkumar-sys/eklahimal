import { groq } from 'next-sanity'
import { safeFetch } from '../client'
import type { SiteSettings } from '@/types/sanity'

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return safeFetch<SiteSettings>(
    groq`*[_type == "siteSettings"][0]{
      _id, bio, youtubeUrl, instagramUrl, storyFormats,
      featuredFilm->{
        _id, title, slug, publishedAt, youtubeUrl, logline, duration,
        thumbnail, region->{ _id, name, slug }
      }
    }`
  )
}
