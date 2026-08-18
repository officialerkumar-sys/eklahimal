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
    month: 'long',
    year: 'numeric',
  })
}

export default async function FilmPage({ params }: { params: { slug: string } }) {
  const film = await getFilmBySlug(params.slug)
  if (!film) notFound()

  return (
    <main style={{ paddingTop: '56px' }}>

      {/* YouTube embed — full width */}
      {film.youtubeUrl && (
        <div className="media-width" style={{ paddingTop: '32px' }}>
          <YouTubeEmbed url={film.youtubeUrl} title={film.title} />
        </div>
      )}

      {/* Title block */}
      <div className="content-width" style={{ marginTop: '36px' }}>

        {/* Region + date — above title */}
        <p
          style={{
            fontSize: '11px',
            textTransform: 'uppercase',
            letterSpacing: '0.10em',
            color: 'var(--color-text-muted)',
            marginBottom: '14px',
          }}
        >
          {[film.region?.name, film.publishedAt ? formatDate(film.publishedAt) : null, film.duration ? `${film.duration} min` : null]
            .filter(Boolean)
            .join(' · ')}
        </p>

        {/* Title */}
        <h1 className="display-title">
          {film.title}
        </h1>

        {/* Logline */}
        {film.logline && (
          <p
            style={{
              fontSize: '17px',
              color: 'var(--color-text-muted)',
              marginTop: '16px',
              lineHeight: 1.6,
              textTransform: 'lowercase',
            }}
          >
            {film.logline}
          </p>
        )}
      </div>

      {/* Rule */}
      <div className="content-width" style={{ marginTop: '36px' }}>
        <div className="rule" />
      </div>

      {/* Body — story behind the film */}
      {film.body && film.body.length > 0 && (
        <div className="content-width" style={{ marginTop: '36px' }}>
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
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
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
              <div style={{ position: 'relative', width: '100%', aspectRatio: '3/2', overflow: 'hidden' }}>
                <Image
                  src={urlForImage(film.relatedEssay.coverImage).width(800).url()}
                  alt={film.relatedEssay.title}
                  fill
                  sizes="700px"
                  style={{ objectFit: 'cover', transition: 'opacity var(--transition-base)' }}
                  className="img-hover"
                />
              </div>
            )}
            <h3
              style={{
                fontSize: '17px',
                fontWeight: 400,
                color: 'var(--color-text)',
                marginTop: '14px',
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
