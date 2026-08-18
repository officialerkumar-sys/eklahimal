import type { Metadata } from 'next'
import Link from 'next/link'
import FilmCard from '@/components/FilmCard'
import { getFilms, getFilmsCount } from '@/lib/sanity/queries/films'

export const metadata: Metadata = { title: 'films' }
export const revalidate = 60

const PER_PAGE = 8

export default async function FilmsPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const page = Math.max(1, parseInt(searchParams.page ?? '1', 10))
  const [films, total] = await Promise.all([getFilms(page, PER_PAGE), getFilmsCount()])
  const totalPages = Math.ceil(total / PER_PAGE)

  return (
    <main style={{ paddingTop: '80px', paddingBottom: 'var(--space-section)' }}>
      <div className="media-width">

        {/* Page header */}
        <div className="page-header">
          <span className="page-header-label">films</span>
          {total > 0 && (
            <span className="page-header-count">{total}</span>
          )}
        </div>

        {films.length === 0 ? (
          <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)' }}>
            nothing published yet.
          </p>
        ) : (
          <>
            {films.map((film, i) => (
              <div
                key={film._id}
                style={{ marginTop: i === 0 ? 0 : 'var(--space-card)' }}
              >
                <FilmCard film={film} />
              </div>
            ))}

            {totalPages > 1 && (
              <div className="pagination">
                {page > 1 && (
                  <Link href={`/films?page=${page - 1}`}>← prev</Link>
                )}
                <span style={{ color: 'var(--color-bg-mid)' }}>
                  {page} / {totalPages}
                </span>
                {page < totalPages && (
                  <Link href={`/films?page=${page + 1}`}>next →</Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
