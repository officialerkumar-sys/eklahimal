import Link from 'next/link'
import { getSiteSettings } from '@/lib/sanity/queries/settings'

const COL_ONE = [
  { href: '/films',      label: 'films' },
  { href: '/essays',     label: 'essays' },
  { href: '/journal',    label: 'journal' },
]

const COL_TWO = [
  { href: '/dispatches', label: 'dispatches' },
  { href: '/about',      label: 'about' },
  { href: '/archive',    label: 'archive' },
]

const YEAR = new Date().getFullYear()

export default async function Footer() {
  const settings = await getSiteSettings()

  return (
    <footer style={{ borderTop: '1px solid rgba(43,49,64,0.5)', marginTop: 'var(--space-section)' }}>

      {/* ── Main body ── */}
      <div
        style={{
          maxWidth: '1600px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr auto auto',
          gap: '0 80px',
          padding: '56px 40px',
          alignItems: 'start',
        }}
        className="footer-grid"
      >

        {/* Brand */}
        <div>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              fontSize: '13px',
              fontWeight: 300,
              letterSpacing: 'var(--letter-spacing-brand)',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              textDecoration: 'none',
            }}
          >
            eklahimal
          </Link>
          <p
            style={{
              fontSize: '14px',
              fontWeight: 300,
              color: 'var(--color-text)',
              lineHeight: 1.65,
              marginTop: '14px',
              maxWidth: '260px',
              textTransform: 'lowercase',
            }}
          >
            solo adventure storytelling from the himalaya.
          </p>
        </div>

        {/* Sitemap col 1 */}
        <nav aria-label="Site links">
          <ul
            style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '11px',
            }}
          >
            {COL_ONE.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="footer-nav-link">{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sitemap col 2 */}
        <nav aria-label="More links">
          <ul
            style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '11px',
            }}
          >
            {COL_TWO.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="footer-nav-link">{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          borderTop: '1px solid rgba(43,49,64,0.12)',
          padding: '20px 40px',
          maxWidth: '1600px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        className="footer-bottom"
      >
        <span
          style={{
            fontSize: '12px',
            fontWeight: 300,
            color: 'var(--color-text-muted)',
            letterSpacing: '0.04em',
          }}
        >
          © {YEAR} eklahimal
        </span>

        {(settings?.youtubeUrl || settings?.instagramUrl) && (
          <div style={{ display: 'flex', gap: '24px' }}>
            {settings?.youtubeUrl && (
              <a
                href={settings.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="footer-social-link"
              >
                YouTube
              </a>
            )}
            {settings?.instagramUrl && (
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="footer-social-link"
              >
                Instagram
              </a>
            )}
          </div>
        )}
      </div>

      <style>{`
        .footer-nav-link {
          font-size: 14px;
          font-weight: 300;
          text-transform: lowercase;
          color: var(--color-text);
          text-decoration: none;
          transition: color var(--transition-base);
        }
        .footer-nav-link:hover { color: var(--color-accent); }

        .footer-social-link {
          font-size: 11px;
          font-weight: 300;
          text-transform: uppercase;
          letter-spacing: var(--letter-spacing-label);
          color: rgba(116,128,144,0.5);
          text-decoration: none;
          transition: color var(--transition-base);
        }
        .footer-social-link:hover { color: var(--color-text-muted); }

        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 40px 32px !important;
          }
          .footer-grid > div:first-child {
            grid-column: 1 / -1;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 12px;
          }
        }
      `}</style>
    </footer>
  )
}
