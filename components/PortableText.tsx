import { PortableText as SanityPortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/react'

const components = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p>{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote>{children}</blockquote>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 style={{ fontSize: '24px', fontWeight: 400, marginBottom: '24px', marginTop: '48px' }}>
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 style={{ fontSize: '20px', fontWeight: 400, marginBottom: '16px', marginTop: '40px' }}>
        {children}
      </h3>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => <span>{children}</span>,
    em: ({ children }: { children?: React.ReactNode }) => <em>{children}</em>,
    link: ({
      value,
      children,
    }: {
      value?: { href?: string }
      children?: React.ReactNode
    }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noreferrer"
        style={{
          color: 'var(--color-text)',
          textDecoration: 'underline',
          textDecorationColor: 'var(--color-text-muted)',
        }}
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul style={{ paddingLeft: '24px', marginBottom: '24px' }}>{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li style={{ marginBottom: '8px' }}>{children}</li>
    ),
  },
}

interface PortableTextProps {
  value: PortableTextBlock[]
}

export default function PortableText({ value }: PortableTextProps) {
  return (
    <div className="prose">
      <SanityPortableText value={value} components={components} />
    </div>
  )
}
