'use client'

import { useState } from 'react'
import type { TripLog } from '@/types/sanity'

const CATEGORY_LABELS: Record<string, string> = {
  transport: 'transport',
  food: 'food',
  stay: 'stay',
  gear: 'gear',
  misc: 'misc',
}

function formatInr(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

interface TripLogSectionProps {
  tripLog: TripLog
}

export default function TripLogSection({ tripLog }: TripLogSectionProps) {
  const [open, setOpen] = useState(false)

  return (
    <section
      style={{
        marginTop: 'var(--space-section)',
        maxWidth: 'var(--space-content-max)',
        margin: 'var(--space-section) auto 0',
        padding: '0 40px',
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: 0,
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
          trip log
        </span>
        <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
          {open ? '−' : '+'}
        </span>
      </button>

      {open && (
        <div style={{ marginTop: '32px' }}>
          {/* Dates */}
          {(tripLog.startDate || tripLog.endDate) && (
            <p
              style={{
                fontSize: 'var(--font-size-caption)',
                color: 'var(--color-text-muted)',
                marginBottom: '24px',
              }}
            >
              {tripLog.startDate} — {tripLog.endDate}
            </p>
          )}

          {/* Total cost */}
          {tripLog.totalCostInr !== undefined && (
            <div style={{ marginBottom: '24px' }}>
              <span
                style={{
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--letter-spacing-label)',
                  color: 'var(--color-text-muted)',
                }}
              >
                total cost
              </span>
              <p
                style={{
                  fontSize: '24px',
                  fontWeight: 300,
                  color: 'var(--color-text)',
                  marginTop: '4px',
                }}
              >
                {formatInr(tripLog.totalCostInr)}
              </p>
            </div>
          )}

          {/* Cost breakdown */}
          {tripLog.costBreakdown && tripLog.costBreakdown.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <span
                style={{
                  display: 'block',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--letter-spacing-label)',
                  color: 'var(--color-text-muted)',
                  marginBottom: '12px',
                }}
              >
                breakdown
              </span>
              {tripLog.costBreakdown.map((item) => (
                <div
                  key={item._key}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    padding: '8px 0',
                    borderBottom: '1px solid rgba(61,74,92,0.4)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '14px',
                      color: 'var(--color-text-muted)',
                      textTransform: 'lowercase',
                    }}
                  >
                    {item.category ? CATEGORY_LABELS[item.category] ?? item.category : '—'}
                    {item.note ? ` — ${item.note}` : ''}
                  </span>
                  <span style={{ fontSize: '14px', color: 'var(--color-text)' }}>
                    {item.amountInr !== undefined ? formatInr(item.amountInr) : '—'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Gear */}
          {tripLog.gearUsed && tripLog.gearUsed.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <span
                style={{
                  display: 'block',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--letter-spacing-label)',
                  color: 'var(--color-text-muted)',
                  marginBottom: '12px',
                }}
              >
                gear
              </span>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {tripLog.gearUsed.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: '14px',
                      color: 'var(--color-text-muted)',
                      padding: '4px 0',
                      textTransform: 'lowercase',
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Conditions */}
          {tripLog.conditions && (
            <div>
              <span
                style={{
                  display: 'block',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: 'var(--letter-spacing-label)',
                  color: 'var(--color-text-muted)',
                  marginBottom: '12px',
                }}
              >
                conditions
              </span>
              <p
                style={{
                  fontSize: '14px',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.6,
                  textTransform: 'lowercase',
                }}
              >
                {tripLog.conditions}
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
