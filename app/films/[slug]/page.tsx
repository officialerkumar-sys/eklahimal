import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import YouTubeEmbed from '@/components/YouTubeEmbed'
import PortableText from '@/components/PortableText'
import TripLogSection from '@/components/TripLogSection'
import { getFilmBySlug, getAllFilmSlugs } from '@/lib/sanity/queries/films'
import { urlForImage } from '@/lib/sanity/image'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await getAllFilmSlugs()
  return slugs.map((s) => ({ slug: s.slug.current }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const film = await getFilmBySlug(params.slug)
  if (!film) return {}
  return {
    title: film.title,
    description: film.logline,
    openGraph: {
      title: film.title,
      description: film.logline,
      images: film.thumbnail
        ? [{ url: urlForImage(film.thumbnail).width(1200).height(630).url() }]
        : [],
    },
  }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function FilmPage({ params }: { params: { slug: string } }) {
  const film = await getFilmBySlug(params.slug)
  if (!film) notFound()

  return (
    <main style={{ paddingTop: '56px' }}>
      {/* Embed */}
      {film.youtubeUrl && (
        <div className="media-width" style={{ paddingTop: '40px' }}>
          <YouTubeEmbed url={film.youtubeUrl} title={film.title} />
        </div>
      )}

      {/* Title block */}
      <div className="content-width" style={{ marginTop: '40px' }}>
        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 300,
            lineHeight: 1.1,
            textTransform: 'lowercase',
            color: 'var(--color-text)',
          }}
        >
          {film.title}
        </h1>

        <p
          style={{
            fontSize: 'var(--font-size-caption)',
            color: 'var(--color-text-muted)',
            marginTop: '16px',
            display: 'flex',
            gap: '0.5em',
            flexWrap: 'wrap',
          }}
        >
          {film.region?.name && <span>{film.region.name}</span>}
          {film.publishedAt && <span>· {formatDate(film.publishedAt)}</span>}
          {film.duration && <span>· {film.duration} min</span>}
        </p>
      </div>

      {/* Body */}
      {film.body && film.body.length > 0 && (
        <div className="content-width" style={{ marginTop: '48px' }}>
          <PortableText value={film.body} />
        </div>
      )}

      {/* Trip log */}
      {film.tripLog && <TripLogSection tripLog={film.tripLog} />}

      {/* Related essay */}
      {film.relatedEssay && (
        <div className="content-width" style={{ marginTop: 'var(--space-section)' }}>
          <span
            style={{
              display: 'block',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: 'var(--letter-spacing-label)',
              color: 'var(--color-text-muted)',
              marginBottom: '16px',
            }}
          >
            photo essay
          </span>

          <Link
            href={`/essays/${film.relatedEssay.slug.current}`}
            style={{ display: 'block', textDecoration: 'none' }}
          >
            {film.relatedEssay.coverImage && (
              <div style={{ position: 'relative', width: '100%', aspectRatio: '3/2' }}>
                <Image
                  src={urlForImage(film.relatedEssay.coverImage).width(800).url()}
                  alt={film.relatedEssay.title}
                  fill
                  sizes="720px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            )}
            <h3
              style={{
                fontSize: '20px',
                fontWeight: 300,
                color: 'var(--color-text)',
                marginTop: '16px',
                textTransform: 'lowercase',
              }}
            >
              {film.relatedEssay.title}
            </h3>
          </Link>
        </div>
      )}

      <div style={{ height: 'var(--space-section)' }} />
    </main>
  )
}
