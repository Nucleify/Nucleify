import { DOC_LANGUAGES } from 'nucleify'

export function isValidDocLang(lang: string): boolean {
  return DOC_LANGUAGES.some((l) => l.code === lang)
}
