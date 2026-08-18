import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity/image'
import type { AnyPiece, Film, PhotoEssay } from '@/types/sanity'

function pieceHref(piece: AnyPiece): string {
  switch (piece._type) {
    case 'film': return `/films/${piece.slug.current}`
    case 'photoEssay': return `/essays/${piece.slug.current}`
    case 'dispatch': return `/dispatches/${piece.slug.current}`
    case 'journalEntry': return `/journal/${piece.slug.current}`
    default: return '/'
  }
}

function pieceImage(piece: AnyPiece): string | null {
  if (piece._type === 'film' && (piece as Film).thumbnail) {
    return urlForImage((piece as Film).thumbnail!).width(1200).url()
  }
  if (piece._type === 'photoEssay' && (piece as PhotoEssay).coverImage) {
    return urlForImage((piece as PhotoEssay).coverImage!).width(1200).url()
  }
  return null
}

function pieceSubline(piece: AnyPiece): string {
  if (piece._type === 'film') return (piece as Film).logline ?? ''
  if (piece._type === 'photoEssay') return (piece as PhotoEssay).intro ?? ''
  if ('logline' in piece && typeof piece.logline === 'string') return piece.logline
  return ''
}

interface ContentFeedProps {
  pieces: AnyPiece[]
}

export default function ContentFeed({ pieces }: ContentFeedProps) {
  return (
    <section
      style={{
        paddingTop: 'var(--space-section)',
        paddingBottom: 'var(--space-section)',
      }}
    >
      {pieces.map((piece, i) => {
        const href = pieceHref(piece)
        const imageUrl = pieceImage(piece)
        const subline = pieceSubline(piece)

        return (
          <article
            key={piece._id}
            style={{ marginTop: i === 0 ? 0 : 'var(--space-card)' }}
          >
            <Link href={href} style={{ display: 'block' }}>
              {/* Image — full width, no container */}
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
                    alt={piece.title}
                    fill
                    sizes="100vw"
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
              <div className="content-width" style={{ marginTop: imageUrl ? '24px' : 0 }}>
                <h2
                  style={{
                    fontSize: 'var(--font-size-display)',
                    fontWeight: 300,
                    lineHeight: 1.1,
                    color: 'var(--color-text)',
                    textTransform: 'lowercase',
                  }}
                >
                  {piece.title}
                </h2>

                {subline && (
                  <p
                    style={{
                      fontSize: '16px',
                      color: 'var(--color-text-muted)',
                      marginTop: '16px',
                      textTransform: 'lowercase',
                    }}
                  >
                    {subline}
                  </p>
                )}
              </div>
            </Link>
          </article>
        )
      })}
    </section>
  )
}
