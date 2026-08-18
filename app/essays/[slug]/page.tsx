import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getEssayBySlug, getAllEssaySlugs } from '@/lib/sanity/queries/essays'
import { urlForImage } from '@/lib/sanity/image'

export const revalidate = 60
export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await getAllEssaySlugs()
  return slugs
    .filter((s) => s.slug?.current)
    .map((s) => ({ slug: s.slug.current }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const essay = await getEssayBySlug(params.slug)
  if (!essay) return {}
  return {
    title: essay.title,
    description: essay.intro,
    openGraph: {
      title: essay.title,
      description: essay.intro,
      images: essay.coverImage
        ? [{ url: urlForImage(essay.coverImage).width(1200).height(630).url() }]
        : [],
    },
  }
}

export default async function EssayPage({ params }: { params: { slug: string } }) {
  const essay = await getEssayBySlug(params.slug)
  if (!essay) notFound()

  return (
    <main style={{ paddingTop: '56px', backgroundColor: 'var(--color-bg)' }}>
      {/* Intro text — only shown if it exists */}
      {essay.intro && (
        <div className="content-width" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
          <p
            style={{
              fontSize: '18px',
              lineHeight: '1.75',
              color: 'var(--color-text)',
              textTransform: 'lowercase',
            }}
          >
            {essay.intro}
          </p>
        </div>
      )}

      {/* Full-bleed frames */}
      {essay.frames?.map((frame, i) => (
        <div key={frame._key ?? i}>
          {/* Image — 100vw */}
          <div style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)', overflow: 'hidden' }}>
            <Image
              src={urlForImage(frame.image).width(2000).url()}
              alt={frame.caption ?? `frame ${i + 1}`}
              width={2000}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto', display: 'block' }}
              priority={i === 0}
            />
          </div>

          {/* Caption */}
          {frame.caption && (
            <p
              style={{
                fontSize: 'var(--font-size-caption)',
                fontWeight: 300,
                lineHeight: 1.6,
                color: 'var(--color-text-muted)',
                textTransform: 'lowercase',
                padding: '16px 40px 0',
                marginBottom: '64px',
              }}
            >
              {frame.caption}
            </p>
          )}

          {!frame.caption && <div style={{ marginBottom: '64px' }} />}
        </div>
      ))}

      {/* Closing line */}
      {essay.closingLine && (
        <div className="content-width" style={{ paddingTop: '32px', paddingBottom: '64px' }}>
          <p
            style={{
              fontSize: '24px',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--color-text)',
              textTransform: 'lowercase',
            }}
          >
            {essay.closingLine}
          </p>
        </div>
      )}

      {/* Related film link */}
      {essay.relatedFilm && (
        <div className="content-width" style={{ paddingBottom: 'var(--space-section)' }}>
          <Link
            href={`/films/${essay.relatedFilm.slug.current}`}
            className="essay-film-link"
          >
            film → {essay.relatedFilm.title}
          </Link>
          <style>{`
            .essay-film-link {
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: var(--letter-spacing-label);
              color: var(--color-text-muted);
              text-decoration: none;
              transition: color var(--transition-base);
            }
            .essay-film-link:hover { color: var(--color-text); }
          `}</style>
        </div>
      )}

      <div style={{ height: 'var(--space-section)' }} />
    </main>
  )
}
