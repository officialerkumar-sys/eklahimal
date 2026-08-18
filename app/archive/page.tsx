import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPieces, getAllRegions } from '@/lib/sanity/queries/archive'

export const metadata: Metadata = { title: 'archive' }
export const revalidate = 60

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function pieceHref(type: string, slug: string): string {
  switch (type) {
    case 'film': return `/films/${slug}`
    case 'photoEssay': return `/essays/${slug}`
    case 'dispatch': return `/dispatches/${slug}`
    case 'journalEntry': return `/journal/${slug}`
    default: return '/'
  }
}

export default async function ArchivePage({
  searchParams,
}: {
  searchParams: { region?: string }
}) {
  const regionSlug = searchParams.region
  const [pieces, regions] = await Promise.all([
    getAllPieces(regionSlug),
    getAllRegions(),
  ])

  return (
    <main style={{ paddingTop: '96px', paddingBottom: 'var(--space-section)' }}>
      <div className="content-width">
        {/* Region filter */}
        {regions.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: '24px',
              flexWrap: 'wrap',
              marginBottom: '48px',
            }}
          >
            <Link
              href="/archive"
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: 'var(--letter-spacing-label)',
                color: !regionSlug ? 'var(--color-text)' : 'var(--color-text-muted)',
                textDecoration: 'none',
                transition: 'color var(--transition-base)',
              }}
            >
              all
            </Link>
            {regions.map((region: { _id: string; name: string; slug: { current: string } }) => (
              <Link
                key={region._id}
                href={`/archive?region=${region.slug.current}`}
                style={{
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--letter-spacing-label)',
                  color:
                    regionSlug === region.slug.current
                      ? 'var(--color-text)'
                      : 'var(--color-text-muted)',
                  textDecoration: 'none',
                  transition: 'color var(--transition-base)',
                }}
              >
                {region.name}
              </Link>
            ))}
          </div>
        )}

        {/* Archive list */}
        {pieces.length === 0 ? (
          <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)' }}>
            nothing published yet.
          </p>
        ) : (
          <div>
            {/* Column headers */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '110px 1fr 180px',
                gap: '0 24px',
                paddingBottom: '14px',
                borderBottom: '1px solid rgba(61,74,92,0.35)',
                marginBottom: '4px',
              }}
              className="archive-header"
            >
              {['date', 'title', 'region'].map((h) => (
                <span
                  key={h}
                  style={{
                    fontSize: '11px',
                    fontWeight: 300,
                    textTransform: 'uppercase',
                    letterSpacing: 'var(--letter-spacing-label)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {h}
                </span>
              ))}
            </div>

            {pieces.map((piece) => (
              <Link
                key={piece._id}
                href={pieceHref(piece._type, piece.slug.current)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '110px 1fr 180px',
                  gap: '0 24px',
                  padding: '11px 0',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(61,74,92,0.15)',
                }}
                className="archive-row"
              >
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 300,
                    color: 'var(--color-text-muted)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {formatDate(piece.publishedAt)}
                </span>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: 300,
                    color: 'var(--color-text)',
                    textTransform: 'lowercase',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {piece.title}
                </span>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 300,
                    color: 'var(--color-text-muted)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {piece.region?.name ?? '—'}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .archive-row { transition: opacity var(--transition-base); }
        .archive-row:hover { opacity: 0.65; }
        @media (max-width: 768px) {
          .archive-header { display: none !important; }
          .archive-row {
            grid-template-columns: 1fr auto !important;
            grid-template-rows: auto auto;
            gap: 4px 16px !important;
          }
          .archive-row > span:nth-child(3) {
            grid-column: 2;
          }
        }
      `}</style>
    </main>
  )
}
