import { defineField, defineType } from 'sanity'

export const region = defineType({
  name: 'region',
  title: 'Region',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'name' }, validation: (R) => R.required() }),
    defineField({ name: 'state', type: 'string', title: 'State — e.g. Himachal Pradesh' }),
    defineField({ name: 'elevation', type: 'number', title: 'Approx elevation (metres)' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'state' },
  },
})
