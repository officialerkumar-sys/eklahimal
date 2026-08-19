import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import Script from 'next/script'
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
  description: 'alone in the himalaya. documenting what happens.',
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
        <div id="google_translate_element" style={{ display: 'none' }} aria-hidden="true" />
        <Script
          id="gt-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `function googleTranslateElementInit(){new google.translate.TranslateElement({pageLanguage:'en',includedLanguages:'hi,ne,bn',autoDisplay:false},'google_translate_element');}`,
          }}
        />
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
