'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { JournalEntry } from '@/types/sanity'

const FORMAT_LABELS: Record<string, string> = {
  'field-note': 'Field Note',
  'night-note': 'Night Note',
  'lookback': 'Lookback',
  'unglamorous': 'Unglamorous Day',
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

interface JournalListProps {
  entries: (JournalEntry & { excerpt?: string })[]
}

export default function JournalList({ entries }: JournalListProps) {
  const [hovered, setHovered] = useState<string | null>(null)

  const hoveredEntry = entries.find((e) => e._id === hovered)

  return (
    <div
      style={{
        display: 'flex',
        gap: '0',
        alignItems: 'flex-start',
        minHeight: '60vh',
      }}
    >
      {/* Left column — entry list */}
      <div
        style={{
          width: '40%',
          paddingRight: '48px',
        }}
        className="journal-left"
      >
        {entries.map((entry) => (
          <Link
            key={entry._id}
            href={`/journal/${entry.slug.current}`}
            onMouseEnter={() => setHovered(entry._id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: 'block',
              padding: '16px 0',
              textDecoration: 'none',
              borderBottom: 'none',
            }}
          >
            {/* Date or day number */}
            <span
              style={{
                display: 'block',
                fontSize: '12px',
                color: 'var(--color-text-muted)',
                marginBottom: '4px',
              }}
            >
              {entry.dayNumber ? `day ${entry.dayNumber}` : formatDate(entry.publishedAt)}
            </span>

            {/* Title */}
            <span
              style={{
                display: 'block',
                fontSize: '16px',
                color: hovered === entry._id ? 'var(--color-text)' : 'var(--color-text)',
                textTransform: 'lowercase',
                lineHeight: 1.3,
                transition: 'color var(--transition-base)',
              }}
            >
              {entry.title}
            </span>

            {/* Format · Region */}
            <span
              style={{
                display: 'block',
                fontSize: '11px',
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: 'var(--letter-spacing-label)',
                marginTop: '4px',
              }}
            >
              {entry.format ? FORMAT_LABELS[entry.format] : ''}
              {entry.region?.name ? ` · ${entry.region.name}` : ''}
            </span>
          </Link>
        ))}
      </div>

      {/* Right column — sticky preview */}
      <div
        style={{
          width: '60%',
          position: 'sticky',
          top: '80px',
          paddingLeft: '48px',
          minHeight: '200px',
        }}
        className="journal-right"
      >
        <div
          style={{
            opacity: hoveredEntry ? 1 : 0,
            transition: 'opacity var(--transition-base)',
          }}
        >
          {hoveredEntry?.excerpt && (
            <p
              style={{
                fontSize: 'var(--font-size-body)',
                lineHeight: 'var(--line-height-body)',
                color: 'var(--color-text)',
                textTransform: 'lowercase',
              }}
            >
              {hoveredEntry.excerpt}
            </p>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .journal-left { width: 100% !important; padding-right: 0 !important; }
          .journal-right { display: none !important; }
        }
      `}</style>
    </div>
  )
}
