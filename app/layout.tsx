import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import '@/styles/globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-dm-sans',
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
    <html lang="en" className={dmSans.variable} style={{ '--font-base': `var(--font-dm-sans), sans-serif` } as React.CSSProperties}>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}
