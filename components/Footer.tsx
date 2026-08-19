import Link from 'next/link'
import { getSiteSettings } from '@/lib/sanity/queries/settings'

const COL_ONE = [
  { href: '/films',      label: 'films' },
  { href: '/essays',     label: 'essays' },
  { href: '/journal',    label: 'journal' },
  { href: '/dispatches', label: 'dispatches' },
]

const COL_TWO = [
  { href: '/about',      label: 'about' },
  { href: '/foundation', label: 'foundation' },
  { href: '/archive',    label: 'archive' },
  { href: '/contact',    label: 'contact' },
]

const YEAR = new Date().getFullYear()

export default async function Footer() {
  const settings = await getSiteSettings()

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(43,49,64,0.5)',
        marginTop: 'var(--space-section)',
        backgroundImage: 'linear-gradient(rgba(26,29,35,0.82), rgba(26,29,35,0.82)), url(/sitemap_background_v2.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}
    >

      {/* ── Main body ── */}
      <div
        style={{
          maxWidth: '1600px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr auto auto auto',
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
            alone in the himalaya. documenting what happens.
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

        {/* Sitemap col 3 — shop & services */}
        <nav aria-label="Shop and services">
          <ul
            style={{
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '11px',
            }}
          >
            <li>
              <Link href="/shop" className="footer-nav-link">shop</Link>
            </li>
            <li style={{ paddingLeft: '14px' }}>
              <Link href="/shop/photographs" className="footer-nav-link footer-nav-sub">photographs</Link>
            </li>
            <li style={{ paddingLeft: '14px' }}>
              <Link href="/shop/gifts" className="footer-nav-link footer-nav-sub">gifts &amp; merch</Link>
            </li>
            <li style={{ marginTop: '6px' }}>
              <Link href="/consulting" className="footer-nav-link">consulting</Link>
            </li>
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
        .footer-nav-sub {
          font-size: 13px;
          color: var(--color-text-muted);
        }

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
          .footer-grid > nav:last-child {
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
