import { film } from './film'
import { photoEssay } from './photoEssay'
import { dispatch } from './dispatch'
import { journalEntry } from './journalEntry'
import { tripLog } from './tripLog'
import { region } from './region'
import { siteSettings } from './siteSettings'

export const schemas = [
  // Taxonomy
  region,
  // Content
  film,
  photoEssay,
  dispatch,
  journalEntry,
  tripLog,
  // Settings
  siteSettings,
]
