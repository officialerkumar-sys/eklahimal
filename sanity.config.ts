import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemas } from '@/sanity/schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  name: 'eklahimal',
  title: 'Eklahimal Studio',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            S.documentTypeListItem('film').title('Films'),
            S.documentTypeListItem('photoEssay').title('Photo Essays'),
            S.documentTypeListItem('dispatch').title('Dispatches'),
            S.documentTypeListItem('journalEntry').title('Journal Entries'),
            S.divider(),
            S.documentTypeListItem('region').title('Regions'),
            S.documentTypeListItem('tripLog').title('Trip Logs'),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemas,
  },
})
