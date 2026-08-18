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

  // Close mobile menu on route change
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          backgroundColor: scrolled ? 'rgba(28,33,40,0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(8px)' : 'none',
          transform: visible ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 300ms ease-out, background-color 300ms ease-out',
        }}
      >
        {/* Brand mark */}
        <Link
          href="/"
          style={{
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: 'var(--letter-spacing-brand)',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
            textDecoration: 'none',
          }}
        >
          Eklahimal
        </Link>

        {/* Desktop nav */}
        <nav
          style={{
            display: 'flex',
            gap: '32px',
            alignItems: 'center',
          }}
          className="hidden-mobile"
        >
          {navLinks.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                style={{
                  fontSize: 'var(--font-size-nav)',
                  fontWeight: 400,
                  letterSpacing: 'var(--letter-spacing-label)',
                  textTransform: 'uppercase',
                  color: active ? 'var(--color-text)' : 'var(--color-text-muted)',
                  textDecoration: 'none',
                  transition: 'color var(--transition-base)',
                }}
                onMouseEnter={(e) => {
                  if (!active) (e.target as HTMLElement).style.color = 'var(--color-text)'
                }}
                onMouseLeave={(e) => {
                  if (!active) (e.target as HTMLElement).style.color = 'var(--color-text-muted)'
                }}
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
            gap: '40px',
          }}
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                fontSize: '32px',
                fontWeight: 300,
                color: 'var(--color-text)',
                textDecoration: 'none',
                textTransform: 'lowercase',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
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
