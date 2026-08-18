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
  { href: '/foundation', label: 'foundation' },
]

const YEAR = new Date().getFullYear()

export default async function Footer() {
  const settings = await getSiteSettings()

  return (
    <footer style={{ borderTop: '1px solid rgba(43,49,64,0.5)', marginTop: 'var(--space-section)' }}>

      {/* ── Mountain illustration ── */}
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: '100px' }}
        aria-hidden="true"
      >
        {/* Back range — hazy distance */}
        <path
          d="M 0,120 L 0,82 L 55,52 L 105,70 L 158,35 L 205,58 L 268,22 L 318,50 L 375,14 L 430,42 L 490,28 L 558,62 L 615,22 L 675,50 L 738,10 L 800,40 L 862,25 L 928,55 L 988,38 L 1052,60 L 1115,40 L 1180,62 L 1242,45 L 1308,60 L 1370,50 L 1440,62 L 1440,120 Z"
          fill="#374559"
        />
        {/* Gold summit — sun on the highest point */}
        <path
          d="M 738,10 L 724,34 L 752,34 Z"
          fill="#B89048"
          opacity="0.6"
        />
        {/* Mid range */}
        <path
          d="M 0,120 L 0,100 L 75,85 L 145,95 L 218,75 L 295,88 L 368,70 L 445,84 L 518,68 L 598,82 L 672,66 L 748,80 L 825,65 L 902,78 L 978,68 L 1058,82 L 1132,70 L 1205,82 L 1278,72 L 1355,84 L 1440,78 L 1440,120 Z"
          fill="#252E3B"
        />
        {/* Front range — closest ridge */}
        <path
          d="M 0,120 L 0,110 L 90,102 L 180,110 L 268,100 L 355,108 L 442,98 L 528,106 L 615,98 L 700,105 L 788,97 L 875,105 L 962,97 L 1048,106 L 1135,98 L 1222,106 L 1308,99 L 1395,106 L 1440,103 L 1440,120 Z"
          fill="#1D2430"
        />
      </svg>

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
