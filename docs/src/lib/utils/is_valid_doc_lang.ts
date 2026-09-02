import { DOC_LANGUAGES } from '../constants/languages'

export function isValidDocLang(lang: string): boolean {
  return DOC_LANGUAGES.some((l) => l.code === lang)
}
