import { defineField, defineType } from 'sanity'

export const film = defineType({
  name: 'film',
  title: 'Film',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (R) => R.required() }),
    defineField({ name: 'publishedAt', type: 'datetime', validation: (R) => R.required() }),
    defineField({ name: 'youtubeUrl', type: 'url', title: 'YouTube URL' }),
    defineField({ name: 'thumbnail', type: 'image', options: { hotspot: true }, title: 'Thumbnail' }),
    defineField({ name: 'region', type: 'reference', to: [{ type: 'region' }] }),
    defineField({ name: 'duration', type: 'number', title: 'Runtime (minutes)' }),
    defineField({
      name: 'logline',
      type: 'string',
      title: 'Logline — one sentence, no period',
      validation: (R) => R.max(160),
    }),
    defineField({
      name: 'body',
      type: 'array',
      title: 'Story behind the film',
      of: [{ type: 'block' }],
    }),
    defineField({ name: 'tripLog', type: 'reference', to: [{ type: 'tripLog' }], title: 'Linked trip log' }),
    defineField({ name: 'relatedEssay', type: 'reference', to: [{ type: 'photoEssay' }], title: 'Related photo essay' }),
    defineField({ name: 'featured', type: 'boolean', title: 'Feature on homepage', initialValue: false }),
  ],
  orderings: [
    { title: 'Newest first', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'logline',
      media: 'thumbnail',
    },
  },
})
