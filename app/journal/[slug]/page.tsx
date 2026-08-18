import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PortableText from '@/components/PortableText'
import { getJournalEntryBySlug, getAllJournalSlugs } from '@/lib/sanity/queries/journal'
import { urlForImage } from '@/lib/sanity/image'

export const revalidate = 60

const FORMAT_LABELS: Record<string, string> = {
  'field-note':  'Field Note',
  'night-note':  'Night Note',
  'lookback':    'Lookback',
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

  function formatCoords(lat: number, lon: number): string {
    const latDir = lat >= 0 ? 'N' : 'S'
    const lonDir = lon >= 0 ? 'E' : 'W'
    return `${Math.abs(lat).toFixed(4)}°${latDir}  ${Math.abs(lon).toFixed(4)}°${lonDir}`
  }

  const metaParts: string[] = []
  if (entry.publishedAt) metaParts.push(formatDate(entry.publishedAt))
  if (entry.region?.name) metaParts.push(entry.region.name)
  if (entry.elevation) metaParts.push(`${entry.elevation} m`)
  if (entry.temperature) metaParts.push(entry.temperature)

  const coordStr = entry.lat != null && entry.lon != null
    ? formatCoords(entry.lat, entry.lon)
    : null

  return (
    <main style={{ paddingTop: '88px', paddingBottom: 'var(--space-section)' }}>
      <div className="content-width">

        {/* Format + day number */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          {entry.format && (
            <span
              style={{
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-text-muted)',
              }}
            >
              {FORMAT_LABELS[entry.format] ?? entry.format}
            </span>
          )}
          {entry.dayNumber && (
            <span
              style={{
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.10em',
                color: 'rgba(138,155,176,0.5)',
              }}
            >
              day {entry.dayNumber}
            </span>
          )}
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 'clamp(22px, 3.5vw, 40px)',
            fontWeight: 400,
            lineHeight: 1.2,
            color: 'var(--color-text)',
            textTransform: 'lowercase',
            marginBottom: '14px',
          }}
        >
          {entry.title}
        </h1>

        {/* Meta */}
        {metaParts.length > 0 && (
          <p
            style={{
              fontSize: '12px',
              fontWeight: 300,
              color: 'var(--color-text-muted)',
              letterSpacing: '0.04em',
              marginBottom: coordStr ? '6px' : '36px',
            }}
          >
            {metaParts.join(' · ')}
          </p>
        )}

        {/* Coordinates */}
        {coordStr && (
          <p
            style={{
              fontSize: '11px',
              fontWeight: 300,
              color: 'rgba(138,155,176,0.55)',
              letterSpacing: '0.06em',
              fontVariantNumeric: 'tabular-nums',
              marginBottom: '36px',
            }}
          >
            {coordStr}
          </p>
        )}

        {/* Rule */}
        <div className="rule" style={{ marginBottom: '36px' }} />

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
                  src={urlForImage(img).width(700).url()}
                  alt=""
                  width={700}
                  height={0}
                  sizes="700px"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            ))}
          </div>
        )}

        {/* End mark */}
        <p
          style={{
            fontSize: '13px',
            color: 'rgba(138,155,176,0.5)',
            textAlign: 'right',
            marginTop: '56px',
          }}
        >
          —
        </p>

        {/* Linked film */}
        {entry.linkedFilm && (
          <div
            style={{
              marginTop: '40px',
              paddingTop: '28px',
              borderTop: '1px solid rgba(61,74,92,0.25)',
            }}
          >
            <Link
              href={`/films/${entry.linkedFilm.slug.current}`}
              className="linked-film-link"
            >
              part of the film → {entry.linkedFilm.title}
            </Link>
            <style>{`
              .linked-film-link {
                font-size: 11px;
                font-weight: 300;
                text-transform: uppercase;
                letter-spacing: 0.10em;
                color: var(--color-text-muted);
                text-decoration: none;
                transition: color var(--transition-base);
              }
              .linked-film-link:hover { color: var(--color-text); }
            `}</style>
          </div>
        )}
      </div>
    </main>
  )
}
