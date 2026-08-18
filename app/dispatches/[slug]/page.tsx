import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PortableText from '@/components/PortableText'
import { getDispatchBySlug, getAllDispatchSlugs } from '@/lib/sanity/queries/dispatches'

export const revalidate = 60

export async function generateStaticParams() {
  const slugs = await getAllDispatchSlugs()
  return slugs.map((s) => ({ slug: s.slug.current }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const dispatch = await getDispatchBySlug(params.slug)
  if (!dispatch) return {}
  return { title: dispatch.title }
}

export default async function DispatchPage({ params }: { params: { slug: string } }) {
  const dispatch = await getDispatchBySlug(params.slug)
  if (!dispatch) notFound()

  return (
    <main style={{ paddingTop: '96px', paddingBottom: 'var(--space-section)' }}>
      <div className="content-width">
        {/* Title */}
        <h1
          style={{
            fontSize: 'clamp(24px, 4vw, 40px)',
            fontWeight: 300,
            lineHeight: 1.2,
            color: 'var(--color-text)',
            textTransform: 'lowercase',
            marginBottom: '48px',
          }}
        >
          {dispatch.title}
        </h1>

        {/* Body */}
        {dispatch.body && dispatch.body.length > 0 && (
          <PortableText value={dispatch.body} />
        )}

        {/* Sign-off */}
        <p
          style={{
            fontSize: 'var(--font-size-caption)',
            color: 'var(--color-text-muted)',
            textAlign: 'right',
            marginTop: '80px',
          }}
        >
          — eklahimal
        </p>

        {/* Related film */}
        {dispatch.relatedFilm && (
          <div style={{ marginTop: '64px' }}>
            <Link
              href={`/films/${dispatch.relatedFilm.slug.current}`}
              className="dispatch-film-link"
            >
              film → {dispatch.relatedFilm.title}
            </Link>
          </div>
        )}

        <style>{`
          .dispatch-film-link {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: var(--letter-spacing-label);
            color: var(--color-text-muted);
            text-decoration: none;
            transition: color var(--transition-base);
          }
          .dispatch-film-link:hover { color: var(--color-text); }
        `}</style>
      </div>
    </main>
  )
}
