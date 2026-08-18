import type { Metadata } from 'next'
import JournalList from '@/components/JournalList'
import { getJournalEntries } from '@/lib/sanity/queries/journal'

export const metadata: Metadata = { title: 'journal' }
export const revalidate = 60

export default async function JournalPage() {
  const entries = await getJournalEntries()

  return (
    <main style={{ paddingTop: '80px', paddingBottom: 'var(--space-section)' }}>
      <div className="media-width">

        {/* Page header */}
        <div className="page-header">
          <span className="page-header-label">field journal</span>
          {entries.length > 0 && (
            <span className="page-header-count">{entries.length} entries</span>
          )}
        </div>

        {entries.length === 0 ? (
          <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)' }}>
            nothing published yet.
          </p>
        ) : (
          <JournalList entries={entries} />
        )}
      </div>
    </main>
  )
}
