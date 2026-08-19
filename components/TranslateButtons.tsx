'use client'

import { useEffect, useState } from 'react'

const LANGS = [
  { code: 'hi', label: 'हिंदी' },
  { code: 'ne', label: 'नेपाली' },
  { code: 'bn', label: 'বাংলা' },
]

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return m ? decodeURIComponent(m[2]) : null
}

function setLang(code: string) {
  const val = `/en/${code}`
  document.cookie = `googtrans=${val};path=/`
  document.cookie = `googtrans=${val};path=/;domain=${window.location.hostname}`
  window.location.reload()
}

function resetLang() {
  const exp = 'expires=Thu, 01 Jan 1970 00:00:00 GMT'
  document.cookie = `googtrans=;path=/;${exp}`
  document.cookie = `googtrans=;path=/;domain=${window.location.hostname};${exp}`
  window.location.reload()
}

export default function TranslateButtons({ variant = 'nav' }: { variant?: 'nav' | 'mobile' }) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const val = getCookie('googtrans')
    if (val?.startsWith('/en/')) {
      const code = val.slice(4)
      if (LANGS.find(l => l.code === code)) setActive(code)
    }
  }, [])

  const isNav = variant === 'nav'

  return (
    <div
      style={
        isNav
          ? { display: 'flex', alignItems: 'center', gap: '2px', borderLeft: '1px solid rgba(116,128,144,0.2)', paddingLeft: '20px', marginLeft: '8px' }
          : { display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'center', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(43,49,64,0.4)' }
      }
    >
      {LANGS.map(({ code, label }) => {
        const isActive = active === code
        return (
          <button
            key={code}
            onClick={() => isActive ? resetLang() : setLang(code)}
            title={isActive ? 'back to english' : label}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: isNav ? '11px' : '20px',
              fontWeight: 300,
              letterSpacing: 0,
              color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
              padding: isNav ? '4px 5px' : '4px 8px',
              transition: 'color var(--transition-base)',
              lineHeight: 1,
            }}
            className="translate-btn"
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
