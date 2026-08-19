import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'consulting' }

export default function ConsultingPage() {
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
          consulting
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
          working with what you are building in the mountains.
        </h1>

        <p
          style={{
            fontSize: 'var(--font-size-body)',
            lineHeight: 'var(--line-height-body)',
            color: 'var(--color-text-muted)',
            textTransform: 'lowercase',
            maxWidth: '560px',
            marginBottom: '40px',
          }}
        >
          logistics, planning, and editorial support for expeditions, documentary
          projects, and creative work set in the himalaya. not a travel agency.
          not a production house. something more specific than that.
        </p>

        <Link
          href="/contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            fontSize: '13px',
            fontWeight: 300,
            textTransform: 'lowercase',
            letterSpacing: '0.03em',
            color: 'var(--color-accent)',
            textDecoration: 'none',
            transition: 'color var(--transition-base)',
          }}
        >
          reach out to discuss →
        </Link>

      </div>
    </main>
  )
}
