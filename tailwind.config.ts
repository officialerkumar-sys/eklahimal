import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        'bg-mid': 'var(--color-bg-mid)',
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        accent: 'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
      },
      maxWidth: {
        content: 'var(--space-content-max)',
        media: 'var(--space-media-max)',
      },
      fontFamily: {
        base: 'var(--font-base)',
      },
      fontSize: {
        body: 'var(--font-size-body)',
        caption: 'var(--font-size-caption)',
        nav: 'var(--font-size-nav)',
        display: 'var(--font-size-display)',
      },
      lineHeight: {
        body: 'var(--line-height-body)',
      },
      letterSpacing: {
        label: 'var(--letter-spacing-label)',
        brand: 'var(--letter-spacing-brand)',
      },
      transitionDuration: {
        base: '300ms',
      },
      transitionTimingFunction: {
        base: 'ease-out',
      },
    },
  },
  plugins: [],
}

export default config
