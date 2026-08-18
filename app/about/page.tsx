import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getSiteSettings } from '@/lib/sanity/queries/settings'
import { getFeaturedFilm } from '@/lib/sanity/queries/films'
import { urlForImage } from '@/lib/sanity/image'

export const metadata: Metadata = { title: 'about' }
export const revalidate = 60

export default async function AboutPage() {
  const [settings, featuredFilm] = await Promise.all([
    getSiteSettings(),
    getFeaturedFilm(),
  ])

  const heroImage = featuredFilm?.thumbnail
    ? urlForImage(featuredFilm.thumbnail).width(1400).url()
    : null

  return (
    <main style={{ paddingTop: '56px' }}>
      {/* Landscape photograph — fills width, no hero text */}
      {heroImage && (
        <div
          style={{
            width: '100%',
            height: '62vh',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Image
            src={heroImage}
            alt="Himalaya"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
        </div>
      )}

      {/* Bio */}
      <div
        className="content-width"
        style={{
          paddingTop: 'var(--space-section)',
          paddingBottom: 'var(--space-section)',
        }}
      >
        {settings?.bio ? (
          <p
            style={{
              fontSize: 'var(--font-size-body)',
              lineHeight: 'var(--line-height-body)',
              color: 'var(--color-text)',
              textTransform: 'lowercase',
            }}
          >
            {settings.bio}
          </p>
        ) : (
          <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-caption)' }}>
            nothing published yet.
          </p>
        )}

        {/* External links */}
        {(settings?.youtubeUrl || settings?.instagramUrl) && (
          <>
          <div
            style={{
              marginTop: '48px',
              display: 'flex',
              gap: '32px',
            }}
          >
            {settings.youtubeUrl && (
              <a
                href={settings.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="about-ext-link"
              >
                YouTube
              </a>
            )}
            {settings?.instagramUrl && (
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="about-ext-link"
              >
                Instagram
              </a>
            )}
          </div>
          <style>{`
            .about-ext-link {
              font-size: 11px;
              font-weight: 300;
              text-transform: uppercase;
              letter-spacing: var(--letter-spacing-label);
              color: var(--color-text-muted);
              text-decoration: none;
              transition: color var(--transition-base);
            }
            .about-ext-link:hover { color: var(--color-text); }
          `}</style>
          </>
        )}
      </div>
    </main>
  )
}
