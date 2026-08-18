import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity/image'
import type { Film } from '@/types/sanity'

interface FilmCardProps {
  film: Film
}

export default function FilmCard({ film }: FilmCardProps) {
  const imageUrl = film.thumbnail
    ? urlForImage(film.thumbnail).width(1200).height(675).url()
    : null

  return (
    <article>
      <Link href={`/films/${film.slug.current}`} style={{ display: 'block' }}>
        {/* Thumbnail */}
        {imageUrl && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              overflow: 'hidden',
            }}
          >
            <Image
              src={imageUrl}
              alt={film.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              style={{
                objectFit: 'cover',
                opacity: 1,
                transition: 'opacity var(--transition-base)',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.opacity = '0.85'
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.opacity = '1'
              }}
            />
          </div>
        )}

        {/* Title */}
        <h2
          style={{
            fontSize: 'var(--font-size-display)',
            fontWeight: 300,
            lineHeight: 1.1,
            color: 'var(--color-text)',
            textTransform: 'lowercase',
            marginTop: '24px',
          }}
        >
          {film.title}
        </h2>

        {/* Meta */}
        <p
          style={{
            fontSize: 'var(--font-size-caption)',
            color: 'var(--color-text-muted)',
            marginTop: '12px',
          }}
        >
          {film.region?.name}
          {film.duration ? ` · ${film.duration} min` : ''}
        </p>

        {/* Logline */}
        {film.logline && (
          <p
            style={{
              fontSize: '16px',
              color: 'var(--color-text-muted)',
              marginTop: '8px',
              textTransform: 'lowercase',
            }}
          >
            {film.logline}
          </p>
        )}
      </Link>
    </article>
  )
}
