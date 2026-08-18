import type { Metadata } from 'next'
import Image from 'next/image'
import { getSiteSettings } from '@/lib/sanity/queries/settings'
import { urlForImage } from '@/lib/sanity/image'

export const metadata: Metadata = { title: 'the co-creator' }
export const revalidate = 60

export default async function AuthorPage() {
  const settings = await getSiteSettings()

  const portraitUrl = settings?.authorPortrait
    ? urlForImage(settings.authorPortrait).width(600).url()
    : null

  return (
    <main style={{ paddingTop: '88px', paddingBottom: 'var(--space-section)', minHeight: '100dvh' }}>
      <div className="content-width">

        <p
          style={{
            fontSize: '10px',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: 'var(--letter-spacing-label)',
            color: 'var(--color-text-muted)',
            marginBottom: '40px',
          }}
        >
          photographer &amp; author
        </p>

        <div
          style={{ display: 'flex', gap: '56px', alignItems: 'flex-start' }}
          className="author-layout"
        >
          {/* Portrait */}
          {portraitUrl && (
            <div style={{ flexShrink: 0 }}>
              <Image
                src={portraitUrl}
                alt={settings?.authorName ?? 'author'}
                width={180}
                height={224}
                style={{ width: '180px', height: '224px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          )}

          {/* Text */}
          <div style={{ flex: 1 }}>
            {settings?.authorName && (
              <h1
                style={{
                  fontSize: 'clamp(24px, 3.5vw, 40px)',
                  fontWeight: 300,
                  color: 'var(--color-text)',
                  textTransform: 'lowercase',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                  marginBottom: '24px',
                }}
              >
                {settings.authorName}
              </h1>
            )}

            {settings?.bio ? (
              <p
                style={{
                  fontSize: 'var(--font-size-body)',
                  lineHeight: 'var(--line-height-body)',
                  color: 'var(--color-text)',
                  textTransform: 'lowercase',
                  whiteSpace: 'pre-line',
                  maxWidth: '520px',
                }}
              >
                {settings.bio}
              </p>
            ) : (
              <p
                style={{
                  fontSize: 'var(--font-size-body)',
                  color: 'var(--color-text-muted)',
                }}
              >
                bio coming soon.
              </p>
            )}

            {(settings?.youtubeUrl || settings?.instagramUrl) && (
              <div style={{ marginTop: '40px', display: 'flex', gap: '28px' }}>
                {settings.youtubeUrl && (
                  <a href={settings.youtubeUrl} target="_blank" rel="noreferrer" className="author-ext-link">
                    YouTube
                  </a>
                )}
                {settings.instagramUrl && (
                  <a href={settings.instagramUrl} target="_blank" rel="noreferrer" className="author-ext-link">
                    Instagram
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

      </div>

      <style>{`
        .author-ext-link {
          font-size: 11px;
          font-weight: 300;
          text-transform: uppercase;
          letter-spacing: var(--letter-spacing-label);
          color: var(--color-text-muted);
          text-decoration: none;
          transition: color var(--transition-base);
        }
        .author-ext-link:hover { color: var(--color-text); }
        @media (max-width: 640px) {
          .author-layout { flex-direction: column !important; gap: 28px !important; }
        }
      `}</style>
    </main>
  )
}
