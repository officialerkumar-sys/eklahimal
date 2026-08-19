import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'shop' }

export default function ShopPage() {
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
          the eklahimal shop
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
          things made from the mountain.
        </h1>

        <p
          style={{
            fontSize: 'var(--font-size-body)',
            lineHeight: 'var(--line-height-body)',
            color: 'var(--color-text-muted)',
            textTransform: 'lowercase',
            maxWidth: '480px',
            marginBottom: '48px',
          }}
        >
          photographs from the field. objects from the himalaya.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Link href="/shop/photographs" className="shop-arrow-link">
            field photographs →
          </Link>
          <Link href="/shop/gifts" className="shop-arrow-link">
            gifts &amp; merchandise →
          </Link>
        </div>

      </div>

      <style>{`
        .shop-arrow-link {
          display: inline-flex;
          align-items: center;
          font-size: 13px;
          font-weight: 300;
          text-transform: lowercase;
          letter-spacing: 0.03em;
          color: var(--color-accent);
          text-decoration: none;
          transition: color var(--transition-base);
        }
        .shop-arrow-link:hover { color: var(--color-accent-hover); }
      `}</style>
    </main>
  )
}
