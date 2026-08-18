import { defineArrayMember, defineField, defineType } from 'sanity'

export const photoEssay = defineType({
  name: 'photoEssay',
  title: 'Photo Essay',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (R) => R.required() }),
    defineField({ name: 'publishedAt', type: 'datetime', validation: (R) => R.required() }),
    defineField({ name: 'region', type: 'reference', to: [{ type: 'region' }] }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'intro',
      type: 'text',
      title: 'Opening line — max 2 sentences',
      validation: (R) => R.max(400),
    }),
    defineField({
      name: 'frames',
      type: 'array',
      title: 'Frames',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'image', type: 'image', options: { hotspot: true }, validation: (R) => R.required() }),
            defineField({ name: 'caption', type: 'string', title: 'Caption — optional, keep short' }),
          ],
          preview: {
            select: { media: 'image', title: 'caption' },
            prepare({ media, title }) {
              return { media, title: title || '(no caption)' }
            },
          },
        }),
      ],
    }),
    defineField({ name: 'closingLine', type: 'string', title: 'Closing line — optional' }),
    defineField({ name: 'relatedFilm', type: 'reference', to: [{ type: 'film' }], title: 'Related film' }),
  ],
  orderings: [
    { title: 'Newest first', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
    },
  },
})
