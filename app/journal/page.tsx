import type { Metadata } from 'next'
import JournalList from '@/components/JournalList'
import { getJournalEntries } from '@/lib/sanity/queries/journal'

export const metadata: Metadata = { title: 'journal' }
export const revalidate = 60

export default async function JournalPage() {
  const entries = await getJournalEntries()

  return (
    <main style={{ paddingTop: '96px' }}>
      <div className="media-width">
        {entries.length === 0 ? (
          <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)' }}>
            nothing published yet.
          </p>
        ) : (
          <JournalList entries={entries} />
        )}
      </div>
      <div style={{ height: 'var(--space-section)' }} />
    </main>
  )
}
