import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity/image'
import type { Film } from '@/types/sanity'

interface HeroProps {
  film: Film
}

export default function Hero({ film }: HeroProps) {
  const imageUrl = film.thumbnail
    ? urlForImage(film.thumbnail).width(2000).url()
    : null

  return (
    <section
      style={{
        position: 'relative',
        height: '100dvh',
        width: '100%',
        overflow: 'hidden',
        background: imageUrl
          ? undefined
          : 'repeating-linear-gradient(101deg, #2A313A 0px, #2A313A 6px, #232A33 6px, #232A33 13px)',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={film.title}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      )}

      {/* Gradient overlay — stronger at bottom for legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 40%, rgba(28,33,40,0.7) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Bottom labels */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '40px',
          right: '40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <span
          style={{
            fontSize: '13px',
            fontWeight: 300,
            letterSpacing: 'var(--letter-spacing-brand)',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
          }}
        >
          eklahimal
        </span>

        <Link
          href={`/films/${film.slug.current}`}
          className="hero-film-link"
        >
          {film.title}
        </Link>
      </div>

      <style>{`
        .hero-film-link {
          font-size: 14px;
          font-weight: 300;
          color: var(--color-text-muted);
          text-decoration: none;
          text-transform: lowercase;
          transition: color var(--transition-base);
        }
        .hero-film-link:hover { color: var(--color-text); }
      `}</style>
    </section>
  )
}
