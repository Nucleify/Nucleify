import type { DocPathInfoInterface } from '../types'

import { DEFAULT_LANG } from '../constants/languages'
import { isValidDocLang } from './is_valid_doc_lang'

export function parseDocPath(path: string): DocPathInfoInterface | null {
  if (!path) return null

  const langPrefixMatch = path.match(/^\/([a-z]{2})\/docs(?:\/(.*))?$/)
  if (langPrefixMatch) {
    const lang = langPrefixMatch[1]
    if (isValidDocLang(lang)) {
      const rest = langPrefixMatch[2] || ''
      const parts = rest.split('/').filter(Boolean)

      if (parts.length < 2) return null

      return {
        lang,
        category: parts[0],
        slug: parts[1],
      }
    }
  }

  if (!path.startsWith('/docs/') && path !== '/docs') {
    return null
  }

  const parts = path.replace('/docs/', '').split('/').filter(Boolean)
  if (parts.length < 2) {
    return null
  }

  return {
    lang: DEFAULT_LANG,
    category: parts[0],
    slug: parts[1],
  }
}
