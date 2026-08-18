import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || null
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: false,
    })
  : null

export async function safeFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T | null> {
  if (!client) return null
  try {
    return await client.fetch<T>(query, params)
  } catch (err) {
    console.warn('[Sanity] fetch error — set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local', err)
    return null
  }
}
