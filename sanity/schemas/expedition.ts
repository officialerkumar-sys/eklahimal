import { defineField, defineType } from 'sanity'
import { slugify } from '../lib/slugify'

export const expedition = defineType({
  name: 'expedition',
  title: 'Expedition / Trip',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Trip name — e.g. Spiti Valley 2026',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', slugify },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'year', type: 'number', title: 'Year' }),
    defineField({ name: 'region', type: 'reference', to: [{ type: 'region' }] }),
    defineField({
      name: 'linkedFilm',
      type: 'reference',
      to: [{ type: 'film' }],
      title: 'Film produced from this trip',
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Display order — lower number shows first',
      initialValue: 0,
    }),
  ],
  orderings: [
    { title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Newest first', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'year' },
    prepare({ title, subtitle }: { title: string; subtitle?: number }) {
      return { title, subtitle: subtitle ? String(subtitle) : '' }
    },
  },
})
