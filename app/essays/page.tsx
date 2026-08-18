import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getEssays } from '@/lib/sanity/queries/essays'
import { urlForImage } from '@/lib/sanity/image'

export const metadata: Metadata = { title: 'essays' }
export const revalidate = 60

export default async function EssaysPage() {
  const essays = await getEssays()

  return (
    <main style={{ paddingTop: '96px' }}>
      {essays.length === 0 ? (
        <div className="content-width">
          <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)' }}>
            nothing published yet.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '48px 40px',
            maxWidth: 'var(--space-media-max)',
            margin: '0 auto',
            padding: '0 40px',
          }}
          className="essays-grid"
        >
          {essays.map((essay) => {
            const imageUrl = essay.coverImage
              ? urlForImage(essay.coverImage).width(800).url()
              : null

            return (
              <article key={essay._id}>
                <Link
                  href={`/essays/${essay.slug.current}`}
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  {/* Cover image — desktop hover shows overlay text */}
                  {imageUrl && (
                    <div
                      style={{ position: 'relative', overflow: 'hidden' }}
                      className="essay-card-image"
                    >
                      <Image
                        src={imageUrl}
                        alt={essay.title}
                        width={800}
                        height={0}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{
                          width: '100%',
                          height: 'auto',
                          display: 'block',
                          opacity: 1,
                          transition: 'opacity var(--transition-base)',
                        }}
                        className="essay-thumb"
                      />
                      {/* Desktop hover overlay */}
                      <div className="essay-overlay">
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '14px', textTransform: 'lowercase' }}>
                          {essay.title}
                          {essay.region?.name && ` — ${essay.region.name}`}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Mobile title always visible */}
                  <p
                    className="essay-mobile-title"
                    style={{
                      fontSize: '14px',
                      color: 'var(--color-text)',
                      marginTop: '12px',
                      textTransform: 'lowercase',
                    }}
                  >
                    {essay.title}
                  </p>
                </Link>
              </article>
            )
          })}
        </div>
      )}

      <div style={{ height: 'var(--space-section)' }} />

      <style>{`
        .essay-overlay {
          position: absolute;
          inset: 0;
          background: rgba(28,33,40,0.55);
          display: flex;
          align-items: flex-end;
          padding: 16px;
          opacity: 0;
          transition: opacity var(--transition-base);
        }
        .essay-card-image:hover .essay-overlay { opacity: 1; }
        .essay-card-image:hover .essay-thumb { opacity: 0.85; }
        .essay-mobile-title { display: none; }

        @media (max-width: 768px) {
          .essays-grid { grid-template-columns: 1fr !important; }
          .essay-overlay { display: none !important; }
          .essay-mobile-title { display: block !important; }
        }
      `}</style>
    </main>
  )
}
