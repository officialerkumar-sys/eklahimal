import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'bio',
      type: 'text',
      title: 'About line — 2 sentences max',
      validation: (R) => R.max(500),
    }),
    defineField({
      name: 'featuredFilm',
      type: 'reference',
      to: [{ type: 'film' }],
      title: 'Homepage featured piece',
    }),
    defineField({ name: 'youtubeUrl', type: 'url', title: 'YouTube channel URL' }),
    defineField({ name: 'instagramUrl', type: 'url', title: 'Instagram URL' }),
    defineField({
      name: 'storyFormats',
      type: 'array',
      title: 'Story Formats — editable without deployment',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Display name — e.g. The Departure' }),
            defineField({ name: 'value', type: 'string', title: 'Slug — e.g. departure' }),
            defineField({ name: 'description', type: 'text', title: 'Internal note on what belongs here' }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'value' },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
