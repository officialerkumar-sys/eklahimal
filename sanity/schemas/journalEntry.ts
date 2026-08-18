import { defineArrayMember, defineField, defineType } from 'sanity'

export const journalEntry = defineType({
  name: 'journalEntry',
  title: 'Journal Entry',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title — can be a date or a single phrase',
      validation: (R) => R.required(),
    }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (R) => R.required() }),
    defineField({ name: 'publishedAt', type: 'datetime', validation: (R) => R.required() }),
    defineField({ name: 'region', type: 'reference', to: [{ type: 'region' }] }),
    defineField({ name: 'elevation', type: 'number', title: 'Elevation when written (metres, optional)' }),
    defineField({ name: 'temperature', type: 'string', title: 'Temperature (optional, e.g. -4°C)' }),
    defineField({ name: 'dayNumber', type: 'number', title: 'Day number of trip (optional)' }),
    defineField({
      name: 'format',
      type: 'string',
      title: 'Entry format',
      options: {
        list: [
          { title: 'Field Note — short, same-day, unedited', value: 'field-note' },
          { title: 'Night Note — written at camp after dark', value: 'night-note' },
          { title: 'Lookback — written weeks later', value: 'lookback' },
          { title: 'The Unglamorous Day — a bad day, honestly told', value: 'unglamorous' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'images',
      type: 'array',
      title: 'Inline images — optional',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
    }),
    defineField({
      name: 'linkedFilm',
      type: 'reference',
      to: [{ type: 'film' }],
      title: 'Part of this film — optional',
    }),
    defineField({ name: 'featured', type: 'boolean', title: 'Feature on journal index', initialValue: false }),
  ],
  orderings: [
    { title: 'Newest first', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'format',
    },
  },
})
