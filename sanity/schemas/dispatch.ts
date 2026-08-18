import { defineField, defineType } from 'sanity'
import { slugify } from '../lib/slugify'

export const dispatch = defineType({
  name: 'dispatch',
  title: 'Dispatch',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title', slugify }, validation: (R) => R.required() }),
    defineField({ name: 'publishedAt', type: 'datetime', validation: (R) => R.required() }),
    defineField({ name: 'region', type: 'reference', to: [{ type: 'region' }] }),
    defineField({
      name: 'territory',
      type: 'string',
      title: 'Content territory',
      options: {
        list: [
          { title: 'The Departure', value: 'departure' },
          { title: 'The Mountain Answers', value: 'mountain-answers' },
          { title: 'The Unglamorous Day', value: 'unglamorous' },
          { title: 'The Economics of Going', value: 'economics' },
          { title: 'Before and After', value: 'before-after' },
          { title: 'The Himalaya as Living Entity', value: 'himalaya' },
        ],
      },
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (R) => R.required(),
    }),
    defineField({ name: 'relatedFilm', type: 'reference', to: [{ type: 'film' }] }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
  ],
  orderings: [
    { title: 'Newest first', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'territory',
    },
  },
})
