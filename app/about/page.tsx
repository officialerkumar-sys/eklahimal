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

  const portraitUrl = settings?.authorPortrait
    ? urlForImage(settings.authorPortrait).width(600).url()
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

        {/* ── Section 1: About the website ───────────────────── */}
        <p className="about-section-label">about eklahimal</p>

        {settings?.siteDescription ? (
          <p className="about-body" style={{ marginTop: '20px', maxWidth: '600px' }}>
            {settings.siteDescription}
          </p>
        ) : (
          <p className="about-body" style={{ marginTop: '20px', maxWidth: '600px' }}>
            eklahimal is a solo adventure storytelling platform from the himalaya — films, photo essays,
            dispatches, and a field journal from high-altitude routes across india.
          </p>
        )}

        {/* Links row */}
        <div style={{ marginTop: '36px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <a href="#author" className="about-arrow-link">
            meet the author →
          </a>

          {settings?.foundationUrl ? (
            <a
              href={settings.foundationUrl}
              target="_blank"
              rel="noreferrer"
              className="about-arrow-link"
            >
              eklahimal foundation ↗
            </a>
          ) : (
            <span className="about-arrow-link about-coming-soon">
              eklahimal foundation
              <span className="about-soon-tag">coming soon</span>
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="rule" style={{ margin: 'var(--space-section) 0' }} />

        {/* ── Section 2: About the author ────────────────────── */}
        <div id="author">
          <p className="about-section-label">photographer &amp; author</p>

          <div style={{ marginTop: '32px', display: 'flex', gap: '48px', alignItems: 'flex-start' }} className="author-layout">

            {/* Portrait */}
            {portraitUrl && (
              <div style={{ flexShrink: 0, width: '160px' }}>
                <Image
                  src={portraitUrl}
                  alt={settings?.authorName ?? 'author'}
                  width={160}
                  height={200}
                  style={{ width: '160px', height: '200px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            )}

            {/* Text */}
            <div style={{ flex: 1 }}>
              {settings?.authorName && (
                <p
                  style={{
                    fontSize: '22px',
                    fontWeight: 300,
                    color: 'var(--color-text)',
                    textTransform: 'lowercase',
                    letterSpacing: '-0.01em',
                    marginBottom: '20px',
                  }}
                >
                  {settings.authorName}
                </p>
              )}

              {settings?.bio ? (
                <p className="about-body" style={{ whiteSpace: 'pre-line', maxWidth: '520px' }}>
                  {settings.bio}
                </p>
              ) : (
                <p className="about-body" style={{ maxWidth: '520px', color: 'var(--color-text-muted)' }}>
                  bio coming soon.
                </p>
              )}

              {/* Social links */}
              {(settings?.youtubeUrl || settings?.instagramUrl) && (
                <div style={{ marginTop: '32px', display: 'flex', gap: '28px' }}>
                  {settings.youtubeUrl && (
                    <a href={settings.youtubeUrl} target="_blank" rel="noreferrer" className="about-ext-link">
                      YouTube
                    </a>
                  )}
                  {settings.instagramUrl && (
                    <a href={settings.instagramUrl} target="_blank" rel="noreferrer" className="about-ext-link">
                      Instagram
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
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
          gap: 10px;
          font-size: 13px;
          font-weight: 300;
          text-transform: lowercase;
          letter-spacing: 0.03em;
          color: var(--color-accent);
          text-decoration: none;
          transition: color var(--transition-base);
          cursor: pointer;
        }
        .about-arrow-link:hover { color: var(--color-accent-hover); }
        .about-coming-soon {
          color: var(--color-text-muted);
          cursor: default;
          gap: 12px;
        }
        .about-coming-soon:hover { color: var(--color-text-muted); }
        .about-soon-tag {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: var(--letter-spacing-label);
          color: rgba(116,128,144,0.5);
        }
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
        @media (max-width: 640px) {
          .author-layout { flex-direction: column !important; gap: 28px !important; }
        }
      `}</style>
    </main>
  )
}
