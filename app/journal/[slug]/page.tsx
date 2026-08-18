import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PortableText from '@/components/PortableText'
import { getJournalEntryBySlug, getAllJournalSlugs } from '@/lib/sanity/queries/journal'
import { urlForImage } from '@/lib/sanity/image'

export const revalidate = 60

const FORMAT_LABELS: Record<string, string> = {
  'field-note': 'Field Note',
  'night-note': 'Night Note',
  'lookback': 'Lookback',
  'unglamorous': 'Unglamorous Day',
}

export async function generateStaticParams() {
  const slugs = await getAllJournalSlugs()
  return slugs.map((s) => ({ slug: s.slug.current }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const entry = await getJournalEntryBySlug(params.slug)
  if (!entry) return {}
  return { title: entry.title }
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function JournalEntryPage({ params }: { params: { slug: string } }) {
  const entry = await getJournalEntryBySlug(params.slug)
  if (!entry) notFound()

  const metaParts: string[] = []
  if (entry.publishedAt) metaParts.push(formatDate(entry.publishedAt))
  if (entry.region?.name) metaParts.push(entry.region.name)
  if (entry.elevation) metaParts.push(`${entry.elevation}m`)
  if (entry.temperature) metaParts.push(entry.temperature)

  return (
    <main style={{ paddingTop: '96px', paddingBottom: 'var(--space-section)' }}>
      <div className="content-width">
        {/* Format tag */}
        {entry.format && (
          <span
            style={{
              display: 'block',
              fontSize: '12px',
              textTransform: 'uppercase',
              letterSpacing: 'var(--letter-spacing-label)',
              color: 'var(--color-text-muted)',
              marginBottom: '16px',
            }}
          >
            {FORMAT_LABELS[entry.format] ?? entry.format}
          </span>
        )}

        {/* Title */}
        <h1
          style={{
            fontSize: 'clamp(24px, 4vw, 40px)',
            fontWeight: 400,
            lineHeight: 1.2,
            color: 'var(--color-text)',
            textTransform: 'lowercase',
            marginBottom: '16px',
          }}
        >
          {entry.title}
        </h1>

        {/* Meta */}
        {metaParts.length > 0 && (
          <p
            style={{
              fontSize: 'var(--font-size-caption)',
              color: 'var(--color-text-muted)',
              marginBottom: '48px',
            }}
          >
            {metaParts.join(' · ')}
          </p>
        )}

        {/* Body */}
        {entry.body && entry.body.length > 0 && (
          <PortableText value={entry.body} />
        )}

        {/* Inline images */}
        {entry.images && entry.images.length > 0 && (
          <div style={{ marginTop: '40px' }}>
            {entry.images.map((img, i) => (
              <div key={i} style={{ marginTop: i === 0 ? 0 : '24px' }}>
                <Image
                  src={urlForImage(img).width(720).url()}
                  alt=""
                  width={720}
                  height={0}
                  sizes="720px"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            ))}
          </div>
        )}

        {/* End mark */}
        <p
          style={{
            fontSize: 'var(--font-size-caption)',
            color: 'var(--color-text-muted)',
            textAlign: 'right',
            marginTop: '64px',
          }}
        >
          —
        </p>

        {/* Linked film */}
        {entry.linkedFilm && (
          <div style={{ marginTop: '48px' }}>
            <Link
              href={`/films/${entry.linkedFilm.slug.current}`}
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: 'var(--letter-spacing-label)',
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
                transition: 'color var(--transition-base)',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = 'var(--color-text)'
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = 'var(--color-text-muted)'
              }}
            >
              part of the film → {entry.linkedFilm.title}
            </Link>
          </div>
        )}
      </div>
    </main>
  )
}
