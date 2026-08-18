import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)' }}>
        nothing here.{' '}
        <Link
          href="/"
          style={{
            color: 'var(--color-text)',
            textDecoration: 'underline',
            textDecorationColor: 'var(--color-text-muted)',
          }}
        >
          go back.
        </Link>
      </p>
    </main>
  )
}
