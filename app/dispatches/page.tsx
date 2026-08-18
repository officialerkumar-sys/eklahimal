import type { Metadata } from 'next'
import Link from 'next/link'
import { getDispatches } from '@/lib/sanity/queries/dispatches'
import type { Dispatch } from '@/types/sanity'

export const metadata: Metadata = { title: 'dispatches' }
export const revalidate = 60

type DispatchListItem = Dispatch & { excerpt?: string }

const TERRITORY_LABELS: Record<string, string> = {
  departure: 'The Departure',
  'mountain-answers': 'The Mountain Answers',
  unglamorous: 'The Unglamorous Day',
  economics: 'The Economics of Going',
  'before-after': 'Before and After',
  himalaya: 'The Himalaya as Living Entity',
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
    <main style={{ paddingTop: '96px', paddingBottom: 'var(--space-section)' }}>
      <div className="content-width">
        {dispatches.length === 0 ? (
          <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)' }}>
            nothing published yet.
          </p>
        ) : (
          <div>
            {dispatches.map((dispatch, i) => (
              <article
                key={dispatch._id}
                style={{
                  marginTop: i === 0 ? 0 : '40px',
                  paddingBottom: '40px',
                  borderBottom: i < dispatches.length - 1 ? '1px solid rgba(61,74,92,0.3)' : 'none',
                }}
              >
                <Link
                  href={`/dispatches/${dispatch.slug.current}`}
                  style={{ display: 'block', textDecoration: 'none' }}
                >
                  <h2
                    style={{
                      fontSize: '18px',
                      fontWeight: 400,
                      color: 'var(--color-text)',
                      textTransform: 'lowercase',
                      marginBottom: '8px',
                      transition: 'color var(--transition-base)',
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.color = 'var(--color-text-muted)'
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.color = 'var(--color-text)'
                    }}
                  >
                    {dispatch.title}
                  </h2>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      marginBottom: '8px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: 'var(--letter-spacing-label)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {dispatch.territory
                        ? (TERRITORY_LABELS[dispatch.territory] ?? dispatch.territory)
                        : null}
                    </span>
                    <span
                      style={{
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: 'var(--letter-spacing-label)',
                        color: 'var(--color-text-muted)',
                      }}
                    >
                      {formatDate(dispatch.publishedAt)}
                    </span>
                  </div>

                  {dispatch.excerpt && (
                    <p
                      style={{
                        fontSize: '16px',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.6,
                        textTransform: 'lowercase',
                      }}
                    >
                      {dispatch.excerpt}
                    </p>
                  )}
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
