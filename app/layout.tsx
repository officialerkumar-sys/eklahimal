import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Nav from '@/components/Nav'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Eklahimal',
    template: '%s — Eklahimal',
  },
  description: 'Solo adventure storytelling from the Himalaya.',
  openGraph: {
    siteName: 'Eklahimal',
    type: 'website',
    locale: 'en_IN',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} style={{ '--font-base': `var(--font-inter), sans-serif` } as React.CSSProperties}>
      <body>
        <Nav />
        {children}
      </body>
    </html>
  )
}
