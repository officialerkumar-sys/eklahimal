import { defineArrayMember, defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteDescription',
      type: 'text',
      title: 'About the website — what Eklahimal is (2–4 sentences)',
      validation: (R) => R.max(800),
    }),
    defineField({
      name: 'authorName',
      type: 'string',
      title: 'Author / photographer name',
    }),
    defineField({
      name: 'authorPortrait',
      type: 'image',
      title: 'Author portrait — optional headshot',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      type: 'text',
      title: 'Author bio — full paragraph',
      validation: (R) => R.max(1200),
    }),
    defineField({
      name: 'foundationUrl',
      type: 'url',
      title: 'Eklahimal Foundation URL — leave blank until site is live',
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
