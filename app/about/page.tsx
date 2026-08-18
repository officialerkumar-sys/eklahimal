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
    <main style={{ paddingTop: '56px', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>

      {/* Hero landscape */}
      {heroImage && (
        <div style={{ width: '100%', height: '62vh', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
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

      <div className="content-width" style={{ paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-section)', flex: 1 }}>

        <p className="about-section-label">about eklahimal</p>

        {settings?.siteDescription ? (
          <p className="about-body" style={{ marginTop: '20px', maxWidth: '600px' }}>
            {settings.siteDescription}
          </p>
        ) : (
          <p className="about-body" style={{ marginTop: '20px', maxWidth: '600px' }}>
            eklahimal documents what happens when you go alone into the himalaya — without a finished plan,
            without a group, and without performing it for anyone. films, photographs, dispatches, and a field journal.
          </p>
        )}

        <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Link href="/author" className="about-arrow-link">
            meet the co-creator →
          </Link>
          <Link href="/foundation" className="about-arrow-link">
            know more about the impact by eklahimal foundation →
          </Link>
        </div>

      </div>

      <style>{`
        .about-section-label {
          font-size: 10px;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: var(--letter-spacing-label);
          color: var(--color-text-muted);
        }
        .about-body {
          font-size: var(--font-size-body);
          line-height: var(--line-height-body);
          color: var(--color-text);
          text-transform: lowercase;
        }
        .about-arrow-link {
          display: inline-flex;
          align-items: center;
          font-size: 13px;
          font-weight: 300;
          text-transform: lowercase;
          letter-spacing: 0.03em;
          color: var(--color-accent);
          text-decoration: none;
          transition: color var(--transition-base);
        }
        .about-arrow-link:hover { color: var(--color-accent-hover); }
      `}</style>
    </main>
  )
}
