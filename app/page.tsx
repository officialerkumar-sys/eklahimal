import { Metadata } from 'next'
import Hero from '@/components/Hero'
import ContentFeed from '@/components/ContentFeed'
import { getHomepageData } from '@/lib/sanity/queries/homepage'

export const metadata: Metadata = {
  title: 'Eklahimal',
}

export const revalidate = 60

export default async function HomePage() {
  const { featuredFilm, recentPieces } = await getHomepageData()

  return (
    <main>
      {featuredFilm && <Hero film={featuredFilm} />}

      {recentPieces.length > 0 && <ContentFeed pieces={recentPieces} />}

      {recentPieces.length === 0 && !featuredFilm && (
        <div
          style={{
            minHeight: '100dvh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)' }}>
            nothing published yet.
          </p>
        </div>
      )}
    </main>
  )
}
