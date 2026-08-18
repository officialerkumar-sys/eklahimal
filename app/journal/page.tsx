import type { Metadata } from 'next'
import JournalList from '@/components/JournalList'
import type { JournalGroup } from '@/components/JournalList'
import { getJournalEntries, getExpeditions } from '@/lib/sanity/queries/journal'

export const metadata: Metadata = { title: 'journal' }
export const revalidate = 60

export default async function JournalPage() {
  const [entries, expeditions] = await Promise.all([
    getJournalEntries(),
    getExpeditions(),
  ])

  // Build grouped structure for the "by trip" view
  const groups: JournalGroup[] = [
    // One section per expedition (in Studio-defined order), oldest-first within each
    ...expeditions
      .map((exp) => ({
        expedition: exp,
        entries: entries
          .filter((e) => e.expedition?._id === exp._id)
          .sort((a, b) => {
            if (a.dayNumber != null && b.dayNumber != null) return a.dayNumber - b.dayNumber
            return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
          }),
      }))
      .filter((g) => g.entries.length > 0),
    // Field notes — entries not linked to any expedition, newest first
    {
      expedition: null,
      entries: entries
        .filter((e) => !e.expedition)
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()),
    },
  ].filter((g) => g.entries.length > 0)

  return (
    <main style={{ paddingTop: '80px', paddingBottom: 'var(--space-section)', minHeight: '100dvh' }}>
      <div className="media-width">

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
          <JournalList entries={entries} groups={groups} />
        )}
      </div>
    </main>
  )
}
