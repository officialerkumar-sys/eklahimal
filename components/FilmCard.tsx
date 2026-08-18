import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity/image'
import type { Film } from '@/types/sanity'

interface FilmCardProps {
  film: Film
}

function getYear(iso?: string): string {
  if (!iso) return ''
  return new Date(iso).getFullYear().toString()
}

export default function FilmCard({ film }: FilmCardProps) {
  const imageUrl = film.thumbnail
    ? urlForImage(film.thumbnail).width(1400).height(788).url()
    : null

  const year = getYear(film.publishedAt)

  return (
    <article>
      <Link href={`/films/${film.slug.current}`} style={{ display: 'block', textDecoration: 'none' }} className="film-card-link">

        {/* Thumbnail */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            overflow: 'hidden',
            background: imageUrl
              ? undefined
              : 'repeating-linear-gradient(101deg, #282D35 0px, #282D35 6px, #21262E 6px, #21262E 13px)',
          }}
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={film.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1400px) 90vw, 1200px"
              style={{ objectFit: 'cover', transition: 'opacity var(--transition-base)' }}
              className="film-thumb"
            />
          )}
        </div>

        {/* Text block */}
        <div style={{ marginTop: '20px', maxWidth: '760px' }}>

          {/* Title */}
          <h2 className="card-title">
            {film.title}
          </h2>

          {/* Meta */}
          <p
            style={{
              fontSize: '14px',
              fontWeight: 300,
              color: 'var(--color-text-muted)',
              marginTop: '10px',
            }}
          >
            {[film.region?.name, year, film.duration ? `${film.duration} min` : null]
              .filter(Boolean)
              .join(' · ')}
          </p>

          {/* Logline */}
          {film.logline && (
            <p
              style={{
                fontSize: '16px',
                fontWeight: 300,
                color: 'var(--color-text-muted)',
                marginTop: '8px',
                textTransform: 'lowercase',
                lineHeight: 1.6,
                maxWidth: '640px',
              }}
            >
              {film.logline}
            </p>
          )}
        </div>
      </Link>

      <style>{`
        .film-card-link:hover .film-thumb { opacity: 0.85; }
      `}</style>
    </article>
  )
}
