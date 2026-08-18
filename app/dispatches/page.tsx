import type { Metadata } from 'next'
import Link from 'next/link'
import { getDispatches } from '@/lib/sanity/queries/dispatches'
import type { Dispatch } from '@/types/sanity'

export const metadata: Metadata = { title: 'dispatches' }
export const revalidate = 60

type DispatchListItem = Dispatch & { excerpt?: string }

const TERRITORY_LABELS: Record<string, string> = {
  departure:           'The Departure',
  'mountain-answers':  'The Mountain Answers',
  unglamorous:         'The Unglamorous Day',
  economics:           'The Economics of Going',
  'before-after':      'Before and After',
  himalaya:            'The Himalaya as Living Entity',
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default async function DispatchesPage() {
  const dispatches = (await getDispatches()) as DispatchListItem[]

  return (
    <main style={{ paddingTop: '80px', paddingBottom: 'var(--space-section)' }}>
      <div className="content-width">

        {/* Page header */}
        <div className="page-header">
          <span className="page-header-label">dispatches</span>
          {dispatches.length > 0 && (
            <span className="page-header-count">{dispatches.length}</span>
          )}
        </div>

        {dispatches.length === 0 ? (
          <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)' }}>
            nothing published yet.
          </p>
        ) : (
          <div>
            {dispatches.map((dispatch, i) => (
              <article
                key={dispatch._id}
                className="dispatch-item"
                style={{
                  marginTop: i === 0 ? 0 : '36px',
                  paddingBottom: '36px',
                  borderBottom: i < dispatches.length - 1
                    ? '1px solid rgba(61,74,92,0.2)'
                    : 'none',
                }}
              >
                <Link
                  href={`/dispatches/${dispatch.slug.current}`}
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  {/* Territory tag */}
                  {dispatch.territory && (
                    <span
                      style={{
                        display: 'block',
                        fontSize: '10px',
                        fontWeight: 300,
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: 'var(--color-text-muted)',
                        marginBottom: '8px',
                      }}
                    >
                      {TERRITORY_LABELS[dispatch.territory] ?? dispatch.territory}
                    </span>
                  )}

                  {/* Title + date row */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      gap: '24px',
                    }}
                  >
                    <h2
                      className="dispatch-title"
                      style={{
                        fontSize: '22px',
                        fontWeight: 300,
                        color: 'var(--color-text)',
                        textTransform: 'lowercase',
                        lineHeight: 1.3,
                        flex: 1,
                      }}
                    >
                      {dispatch.title}
                    </h2>
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 300,
                        color: 'var(--color-text-muted)',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      {formatDate(dispatch.publishedAt)}
                    </span>
                  </div>

                  {/* Excerpt */}
                  {dispatch.excerpt && (
                    <p
                      style={{
                        fontSize: '15px',
                        fontWeight: 300,
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.65,
                        textTransform: 'lowercase',
                        marginTop: '8px',
                      }}
                    >
                      {dispatch.excerpt.slice(0, 160)}{dispatch.excerpt.length > 160 ? '…' : ''}
                    </p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .dispatch-item a:hover .dispatch-title {
          color: var(--color-text-muted);
          transition: color var(--transition-base);
        }
      `}</style>
    </main>
  )
}
