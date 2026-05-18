import type { DocLanguageInterface } from '../types'

export const DOC_LANGUAGES: DocLanguageInterface[] = [
  { code: 'en', name: 'English', isDefault: true },
  { code: 'pl', name: 'Polski', isDefault: false },
]

export const DEFAULT_LANG = 'en'
