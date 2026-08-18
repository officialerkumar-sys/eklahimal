'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { JournalEntry, Expedition } from '@/types/sanity'

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

export interface JournalGroup {
  expedition: Expedition | null
  entries: (JournalEntry & { excerpt?: string })[]
}

interface EntryRowProps {
  entry: JournalEntry & { excerpt?: string }
  hovered: string | null
  onHover: (id: string | null) => void
}

function EntryRow({ entry, hovered, onHover }: EntryRowProps) {
  return (
    <Link
      href={`/journal/${entry.slug.current}`}
      onMouseEnter={() => onHover(entry._id)}
      onMouseLeave={() => onHover(null)}
      className={`journal-entry${hovered === entry._id ? ' journal-entry-active' : ''}`}
    >
      <span className="journal-entry-stamp">
        {entry.dayNumber ? `day ${entry.dayNumber}` : formatDate(entry.publishedAt)}
      </span>
      <span className="journal-entry-title">{entry.title}</span>
      {(entry.format || entry.region?.name) && (
        <span className="journal-entry-meta">
          {entry.format ? FORMAT_LABELS[entry.format] : ''}
          {entry.region?.name ? ` · ${entry.region.name}` : ''}
        </span>
      )}
    </Link>
  )
}

interface JournalListProps {
  entries: (JournalEntry & { excerpt?: string })[]
  groups: JournalGroup[]
}

export default function JournalList({ entries, groups }: JournalListProps) {
  const [view, setView] = useState<'chrono' | 'trips'>('chrono')
  const [hovered, setHovered] = useState<string | null>(null)

  const hoveredEntry = entries.find((e) => e._id === hovered)
  const hasTrips = groups.some((g) => g.expedition !== null)

  return (
    <div>
      {/* View toggle — only shown if at least one expedition exists */}
      {hasTrips && (
        <div style={{ display: 'flex', gap: '4px', marginBottom: '36px' }}>
          <button
            onClick={() => setView('chrono')}
            className={`view-toggle${view === 'chrono' ? ' view-toggle-active' : ''}`}
          >
            chronological
          </button>
          <span style={{ color: 'rgba(116,128,144,0.4)', fontSize: '11px', lineHeight: '28px' }}>/</span>
          <button
            onClick={() => setView('trips')}
            className={`view-toggle${view === 'trips' ? ' view-toggle-active' : ''}`}
          >
            by trip
          </button>
        </div>
      )}

      {/* List + preview */}
      <div style={{ display: 'flex', gap: '0', alignItems: 'flex-start', minHeight: '60vh' }}>

        {/* Left column */}
        <div style={{ width: '420px', flexShrink: 0 }} className="journal-left">

          {view === 'chrono' ? (
            entries.map((entry) => (
              <EntryRow key={entry._id} entry={entry} hovered={hovered} onHover={setHovered} />
            ))
          ) : (
            groups.map((group, gi) => (
              <div key={group.expedition?._id ?? 'field-notes'} style={{ marginTop: gi === 0 ? 0 : '40px' }}>
                {/* Trip header */}
                <div className="trip-header">
                  <span className="trip-header-title">
                    {group.expedition ? group.expedition.title : 'field notes'}
                  </span>
                  {group.expedition?.linkedFilm && (
                    <Link
                      href={`/films/${group.expedition.linkedFilm.slug.current}`}
                      className="trip-film-link"
                    >
                      film →
                    </Link>
                  )}
                </div>
                {group.entries.map((entry) => (
                  <EntryRow key={entry._id} entry={entry} hovered={hovered} onHover={setHovered} />
                ))}
              </div>
            ))
          )}
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
      </div>

      <style>{`
        .view-toggle {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 11px;
          font-weight: 300;
          text-transform: uppercase;
          letter-spacing: var(--letter-spacing-label);
          color: var(--color-text-muted);
          padding: 0 8px;
          height: 28px;
          transition: color var(--transition-base);
          font-family: var(--font-base);
        }
        .view-toggle:hover { color: var(--color-text); }
        .view-toggle-active {
          color: var(--color-text);
          border-bottom: 1px solid var(--color-accent);
        }

        .trip-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          padding-bottom: 10px;
          margin-bottom: 4px;
          border-bottom: 1px solid rgba(43,49,64,0.6);
        }
        .trip-header-title {
          font-size: 11px;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: var(--letter-spacing-label);
          color: var(--color-text-muted);
        }
        .trip-film-link {
          font-size: 10px;
          font-weight: 300;
          text-transform: uppercase;
          letter-spacing: var(--letter-spacing-label);
          color: var(--color-accent);
          text-decoration: none;
          transition: color var(--transition-base);
        }
        .trip-film-link:hover { color: var(--color-accent-hover); }

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
