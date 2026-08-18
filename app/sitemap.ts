import type { MetadataRoute } from 'next'
import { getAllFilmSlugs } from '@/lib/sanity/queries/films'
import { getAllEssaySlugs } from '@/lib/sanity/queries/essays'
import { getAllDispatchSlugs } from '@/lib/sanity/queries/dispatches'
import { getAllJournalSlugs } from '@/lib/sanity/queries/journal'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://eklahimal.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [filmSlugs, essaySlugs, dispatchSlugs, journalSlugs] = await Promise.all([
    getAllFilmSlugs(),
    getAllEssaySlugs(),
    getAllDispatchSlugs(),
    getAllJournalSlugs(),
  ])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/films`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/essays`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/journal`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/dispatches`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/archive`, changeFrequency: 'daily', priority: 0.7 },
  ]

  const filmRoutes = filmSlugs.map((s) => ({
    url: `${BASE_URL}/films/${s.slug.current}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const essayRoutes = essaySlugs.map((s) => ({
    url: `${BASE_URL}/essays/${s.slug.current}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const dispatchRoutes = dispatchSlugs.map((s) => ({
    url: `${BASE_URL}/dispatches/${s.slug.current}`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const journalRoutes = journalSlugs.map((s) => ({
    url: `${BASE_URL}/journal/${s.slug.current}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...filmRoutes, ...essayRoutes, ...dispatchRoutes, ...journalRoutes]
}
