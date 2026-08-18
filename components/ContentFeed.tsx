import Image from 'next/image'
import Link from 'next/link'
import { urlForImage } from '@/lib/sanity/image'
import type { AnyPiece, Film, PhotoEssay } from '@/types/sanity'

const TYPE_LABELS: Record<string, string> = {
  film: 'film',
  photoEssay: 'photo essay',
  dispatch: 'dispatch',
  journalEntry: 'journal',
}

function pieceHref(piece: AnyPiece): string {
  switch (piece._type) {
    case 'film':          return `/films/${piece.slug.current}`
    case 'photoEssay':   return `/essays/${piece.slug.current}`
    case 'dispatch':     return `/dispatches/${piece.slug.current}`
    case 'journalEntry': return `/journal/${piece.slug.current}`
    default:             return '/'
  }
}

function pieceImage(piece: AnyPiece): string | null {
  if (piece._type === 'film' && (piece as Film).thumbnail)
    return urlForImage((piece as Film).thumbnail!).width(1600).url()
  if (piece._type === 'photoEssay' && (piece as PhotoEssay).coverImage)
    return urlForImage((piece as PhotoEssay).coverImage!).width(1600).url()
  return null
}

function pieceSubline(piece: AnyPiece): string {
  if (piece._type === 'film') return (piece as Film).logline ?? ''
  if (piece._type === 'photoEssay') return (piece as PhotoEssay).intro ?? ''
  if ('logline' in piece && typeof piece.logline === 'string') return piece.logline
  return ''
}

function pieceRegion(piece: AnyPiece): string {
  if ('region' in piece && piece.region && typeof piece.region === 'object' && 'name' in piece.region) {
    return (piece.region as { name: string }).name
  }
  return ''
}

interface ContentFeedProps {
  pieces: AnyPiece[]
}

export default function ContentFeed({ pieces }: ContentFeedProps) {
  return (
    <section style={{ paddingTop: 'var(--space-section)', paddingBottom: 'var(--space-section)' }}>

      {pieces.map((piece, i) => {
        const href      = pieceHref(piece)
        const imageUrl  = pieceImage(piece)
        const subline   = pieceSubline(piece)
        const region    = pieceRegion(piece)
        const typeLabel = TYPE_LABELS[piece._type] ?? piece._type

        return (
          <article
            key={piece._id}
            style={{ marginTop: i === 0 ? 0 : 'var(--space-card)' }}
          >
            <Link href={href} style={{ display: 'block', textDecoration: 'none' }} className="feed-link">

              {/* Full-bleed image */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/9',
                  overflow: 'hidden',
                  background: imageUrl
                    ? undefined
                    : 'repeating-linear-gradient(101deg, #2A313A 0px, #2A313A 6px, #232A33 6px, #232A33 13px)',
                }}
              >
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={piece.title}
                    fill
                    sizes="100vw"
                    style={{ objectFit: 'cover', transition: 'opacity var(--transition-base)' }}
                    className="feed-thumb"
                  />
                )}
              </div>

              {/* Text block */}
              <div
                className="content-width"
                style={{ marginTop: '20px' }}
              >
                {/* Type tag + region */}
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center',
                    marginBottom: '12px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: 'var(--letter-spacing-label)',
                      color: 'var(--color-text-muted)',
                      fontWeight: 300,
                    }}
                  >
                    {typeLabel}
                  </span>
                  {region && (
                    <span
                      style={{
                        fontSize: '11px',
                        color: 'rgba(138,155,176,0.55)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.10em',
                        fontWeight: 300,
                      }}
                    >
                      {region}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h2 className="card-title">
                  {piece.title}
                </h2>

                {/* Subline */}
                {subline && (
                  <p
                    style={{
                      fontSize: '16px',
                      fontWeight: 300,
                      color: 'var(--color-text-muted)',
                      marginTop: '14px',
                      textTransform: 'lowercase',
                      lineHeight: 1.6,
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

      <style>{`
        .feed-link:hover .feed-thumb { opacity: 0.85; }
      `}</style>
    </section>
  )
}
