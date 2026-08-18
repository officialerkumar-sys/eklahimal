'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { JournalEntry } from '@/types/sanity'

const FORMAT_LABELS: Record<string, string> = {
  'field-note':  'Field Note',
  'night-note':  'Night Note',
  'lookback':    'Lookback',
  'unglamorous': 'Unglamorous Day',
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatCoords(lat: number, lon: number): string {
  const latDir = lat >= 0 ? 'N' : 'S'
  const lonDir = lon >= 0 ? 'E' : 'W'
  return `${Math.abs(lat).toFixed(4)}°${latDir}  ${Math.abs(lon).toFixed(4)}°${lonDir}`
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
      <div style={{ width: '420px', flexShrink: 0 }} className="journal-left">
        {entries.map((entry) => (
          <Link
            key={entry._id}
            href={`/journal/${entry.slug.current}`}
            onMouseEnter={() => setHovered(entry._id)}
            onMouseLeave={() => setHovered(null)}
            className={`journal-entry${hovered === entry._id ? ' journal-entry-active' : ''}`}
          >
            <span className="journal-entry-stamp">
              {entry.dayNumber ? `day ${entry.dayNumber}` : formatDate(entry.publishedAt)}
            </span>
            <span className="journal-entry-title">
              {entry.title}
            </span>
            {(entry.format || entry.region?.name) && (
              <span className="journal-entry-meta">
                {entry.format ? FORMAT_LABELS[entry.format] : ''}
                {entry.region?.name ? ` · ${entry.region.name}` : ''}
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Right column — sticky preview */}
      <div
        style={{
          flex: 1,
          position: 'sticky',
          top: '80px',
          paddingLeft: '56px',
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
          {hoveredEntry && (
            <>
              <h2
                style={{
                  fontSize: '32px',
                  fontWeight: 300,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.2,
                  color: 'var(--color-text)',
                  textTransform: 'lowercase',
                  marginBottom: '12px',
                }}
              >
                {hoveredEntry.title}
              </h2>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--color-text-muted)',
                  fontWeight: 300,
                  marginBottom: (hoveredEntry.lat != null && hoveredEntry.lon != null) ? '6px' : '20px',
                }}
              >
                {[
                  hoveredEntry.dayNumber ? `day ${hoveredEntry.dayNumber}` : formatDate(hoveredEntry.publishedAt),
                  hoveredEntry.region?.name,
                  hoveredEntry.elevation ? `${hoveredEntry.elevation} m` : null,
                  hoveredEntry.temperature ?? null,
                ].filter(Boolean).join(' · ')}
              </p>
              {hoveredEntry.lat != null && hoveredEntry.lon != null && (
                <p
                  style={{
                    fontSize: '11px',
                    fontWeight: 300,
                    color: 'rgba(116,128,144,0.5)',
                    letterSpacing: '0.06em',
                    fontVariantNumeric: 'tabular-nums',
                    marginBottom: '20px',
                  }}
                >
                  {formatCoords(hoveredEntry.lat, hoveredEntry.lon)}
                </p>
              )}
              {hoveredEntry.excerpt && (
                <p
                  style={{
                    fontSize: 'var(--font-size-body)',
                    lineHeight: 'var(--line-height-body)',
                    color: 'var(--color-text)',
                    textTransform: 'lowercase',
                    fontWeight: 300,
                  }}
                >
                  {hoveredEntry.excerpt}
                </p>
              )}
            </>
          )}
        </div>
      </div>

      <style>{`
        .journal-entry {
          display: block;
          padding: 14px 0;
          border-bottom: 1px solid rgba(43,49,64,0.15);
          text-decoration: none;
          transition: opacity var(--transition-base);
        }
        .journal-entry:hover { opacity: 0.75; }
        .journal-entry-stamp {
          display: block;
          font-size: 12px;
          font-weight: 300;
          color: var(--color-text-muted);
          margin-bottom: 3px;
        }
        .journal-entry-title {
          display: block;
          font-size: 16px;
          font-weight: 300;
          color: var(--color-text);
          text-transform: lowercase;
          line-height: 1.35;
        }
        .journal-entry-meta {
          display: block;
          font-size: 11px;
          font-weight: 300;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: var(--letter-spacing-label);
          margin-top: 4px;
        }
        @media (max-width: 768px) {
          .journal-left { width: 100% !important; }
          .journal-right { display: none !important; }
        }
      `}</style>
    </div>
  )
}
