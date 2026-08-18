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
        backgroundColor: 'var(--color-bg)',
      }}
    >
      {/* Background image */}
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

      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(28,33,40,0.45)',
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
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: 'var(--letter-spacing-brand)',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
          }}
        >
          Eklahimal
        </span>

        <Link
          href={`/films/${film.slug.current}`}
          style={{
            fontSize: '14px',
            fontWeight: 400,
            color: 'var(--color-text-muted)',
            textDecoration: 'none',
            textTransform: 'lowercase',
            transition: 'color var(--transition-base)',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.color = 'var(--color-text)'
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.color = 'var(--color-text-muted)'
          }}
        >
          {film.title}
        </Link>
      </div>
    </section>
  )
}
