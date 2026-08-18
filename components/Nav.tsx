'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const navLinks = [
  { href: '/films', label: 'films' },
  { href: '/essays', label: 'essays' },
  { href: '/journal', label: 'journal' },
  { href: '/dispatches', label: 'dispatches' },
  { href: '/about', label: 'about' },
  { href: '/archive', label: 'archive' },
] as const

export default function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 12)
      setVisible(y < lastScrollY.current || y < 56)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '56px',
          zIndex: 100,
          backgroundColor: scrolled ? 'rgba(26,29,35,0.92)' : 'rgba(26,29,35,0.55)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderBottom: scrolled ? 'none' : '1px solid rgba(43,49,64,0.2)',
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform var(--transition-base), background-color var(--transition-base), border-color var(--transition-base)',
        }}
      >
        <div
          style={{
            maxWidth: '1600px',
            margin: '0 auto',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 40px',
          }}
        >
          {/* Brand */}
          <Link
            href="/"
            style={{
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

          {/* Desktop nav */}
          <nav
            style={{ display: 'flex', gap: '28px', alignItems: 'center' }}
            className="hidden-mobile"
          >
            {navLinks.map(({ href, label }) => {
              const active = pathname === href || pathname.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  className={`nav-link${active ? ' nav-active' : ''}`}
                >
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="open navigation"
            className="show-mobile"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-text-muted)',
              fontSize: '20px',
              padding: '8px',
              lineHeight: 1,
            }}
          >
            —
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            backgroundColor: 'var(--color-bg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '36px',
          }}
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontSize: '28px',
                fontWeight: 300,
                color: 'var(--color-text)',
                textDecoration: 'none',
                textTransform: 'lowercase',
                letterSpacing: '-0.01em',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        .nav-link {
          font-size: 11px;
          font-weight: 300;
          letter-spacing: var(--letter-spacing-label);
          text-transform: uppercase;
          color: var(--color-text-muted);
          text-decoration: none;
          transition: color var(--transition-base);
        }
        .nav-link.nav-active { color: var(--color-text); }
        .nav-link:not(.nav-active):hover { color: var(--color-text); }

        @media (min-width: 769px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
      `}</style>
    </>
  )
}
