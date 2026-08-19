import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'field photographs' }

export default function PhotographsPage() {
  return (
    <main style={{ paddingTop: '88px', paddingBottom: 'var(--space-section)', minHeight: '100dvh' }}>
      <div className="content-width">

        <p
          style={{
            fontSize: '10px',
            fontWeight: 400,
            textTransform: 'uppercase',
            letterSpacing: 'var(--letter-spacing-label)',
            color: 'var(--color-text-muted)',
            marginBottom: '32px',
          }}
        >
          field photographs
        </p>

        <h1
          style={{
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 300,
            color: 'var(--color-text)',
            textTransform: 'lowercase',
            letterSpacing: '-0.01em',
            lineHeight: 1.15,
            maxWidth: '640px',
            marginBottom: '28px',
          }}
        >
          himalayan photographs, available as prints.
        </h1>

        <p
          style={{
            fontSize: 'var(--font-size-body)',
            lineHeight: 'var(--line-height-body)',
            color: 'var(--color-text-muted)',
            textTransform: 'lowercase',
            maxWidth: '520px',
          }}
        >
          selected images from expeditions — printed, numbered, and signed.
          each photograph is made alone in the field, without a crew.
        </p>

        <p
          style={{
            marginTop: '48px',
            fontSize: '11px',
            fontWeight: 300,
            textTransform: 'uppercase',
            letterSpacing: 'var(--letter-spacing-label)',
            color: 'rgba(116,128,144,0.5)',
          }}
        >
          coming soon
        </p>

      </div>
    </main>
  )
}
