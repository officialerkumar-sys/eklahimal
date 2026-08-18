import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { client } from './client'

const builder = client ? imageUrlBuilder(client) : null

export function urlForImage(source: SanityImageSource) {
  if (!builder) {
    // No Sanity client — pages won't call this without data anyway
    throw new Error('urlForImage called without NEXT_PUBLIC_SANITY_PROJECT_ID set')
  }
  return builder.image(source)
}
