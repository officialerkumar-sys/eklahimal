import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getEssays } from '@/lib/sanity/queries/essays'
import { urlForImage } from '@/lib/sanity/image'

export const metadata: Metadata = { title: 'essays' }
export const revalidate = 60

export default async function EssaysPage() {
  const essays = await getEssays()

  const leftCol = essays.filter((_, i) => i % 2 === 0)
  const rightCol = essays.filter((_, i) => i % 2 !== 0)

  return (
    <main style={{ paddingTop: '80px', paddingBottom: 'var(--space-section)' }}>
      <div className="media-width">

        {/* Page header */}
        <div className="page-header">
          <span className="page-header-label">photo essays</span>
          {essays.length > 0 && (
            <span className="page-header-count">{essays.length}</span>
          )}
        </div>

        {essays.length === 0 ? (
          <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)' }}>
            nothing published yet.
          </p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0 32px',
            }}
            className="essays-masonry"
          >
            {/* Left column: 0, 2, 4… */}
            <div>
              {leftCol.map((essay, i) => {
                const imageUrl = essay.coverImage
                  ? urlForImage(essay.coverImage).width(800).url()
                  : null
                return (
                  <article key={essay._id} style={{ marginTop: i === 0 ? 0 : '40px' }}>
                    <Link href={`/essays/${essay.slug.current}`} style={{ display: 'block', textDecoration: 'none' }}>
                      {imageUrl ? (
                        <div style={{ overflow: 'hidden' }}>
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
                              transition: 'opacity var(--transition-base)',
                            }}
                            className="essay-thumb"
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            width: '100%',
                            aspectRatio: '4/3',
                            background: 'repeating-linear-gradient(101deg, #2A313A 0px, #2A313A 6px, #232A33 6px, #232A33 13px)',
                          }}
                        />
                      )}
                      <div style={{ marginTop: '12px' }}>
                        <p style={{ fontSize: '15px', fontWeight: 300, color: 'var(--color-text)', textTransform: 'lowercase', lineHeight: 1.35 }}>
                          {essay.title}
                        </p>
                        {essay.region?.name && (
                          <p style={{ fontSize: '12px', fontWeight: 300, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.10em', marginTop: '4px' }}>
                            {essay.region.name}
                          </p>
                        )}
                      </div>
                    </Link>
                  </article>
                )
              })}
            </div>

            {/* Right column: 1, 3, 5… — offset 72px down */}
            <div style={{ paddingTop: '72px' }}>
              {rightCol.map((essay, i) => {
                const imageUrl = essay.coverImage
                  ? urlForImage(essay.coverImage).width(800).url()
                  : null
                return (
                  <article key={essay._id} style={{ marginTop: i === 0 ? 0 : '40px' }}>
                    <Link href={`/essays/${essay.slug.current}`} style={{ display: 'block', textDecoration: 'none' }}>
                      {imageUrl ? (
                        <div style={{ overflow: 'hidden' }}>
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
                              transition: 'opacity var(--transition-base)',
                            }}
                            className="essay-thumb"
                          />
                        </div>
                      ) : (
                        <div
                          style={{
                            width: '100%',
                            aspectRatio: '4/3',
                            background: 'repeating-linear-gradient(101deg, #2A313A 0px, #2A313A 6px, #232A33 6px, #232A33 13px)',
                          }}
                        />
                      )}
                      <div style={{ marginTop: '12px' }}>
                        <p style={{ fontSize: '15px', fontWeight: 300, color: 'var(--color-text)', textTransform: 'lowercase', lineHeight: 1.35 }}>
                          {essay.title}
                        </p>
                        {essay.region?.name && (
                          <p style={{ fontSize: '12px', fontWeight: 300, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.10em', marginTop: '4px' }}>
                            {essay.region.name}
                          </p>
                        )}
                      </div>
                    </Link>
                  </article>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .essay-thumb:hover { opacity: 0.82; }
        @media (max-width: 640px) {
          .essays-masonry {
            grid-template-columns: 1fr !important;
          }
          .essays-masonry > div:last-child {
            padding-top: 0 !important;
          }
        }
      `}</style>
    </main>
  )
}
