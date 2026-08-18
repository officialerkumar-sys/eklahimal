import { defineArrayMember, defineField, defineType } from 'sanity'

export const tripLog = defineType({
  name: 'tripLog',
  title: 'Trip Log',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'region', type: 'reference', to: [{ type: 'region' }] }),
    defineField({ name: 'startDate', type: 'date' }),
    defineField({ name: 'endDate', type: 'date' }),
    defineField({ name: 'totalCostInr', type: 'number', title: 'Total cost (INR)' }),
    defineField({
      name: 'costBreakdown',
      title: 'Cost breakdown',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'category', type: 'string', title: 'Category — transport / food / stay / gear / misc' }),
            defineField({ name: 'amountInr', type: 'number', title: 'Amount (INR)' }),
            defineField({ name: 'note', type: 'string' }),
          ],
          preview: {
            select: { title: 'category', subtitle: 'amountInr' },
            prepare({ title, subtitle }) {
              return { title, subtitle: subtitle ? `₹${subtitle}` : undefined }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'gearUsed',
      type: 'array',
      title: 'Gear used',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'conditions', type: 'text', title: 'Conditions and notes' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'totalCostInr' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ? `₹${subtitle.toLocaleString('en-IN')}` : undefined }
    },
  },
})
