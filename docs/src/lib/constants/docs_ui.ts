import { resolveLocalized, type LocalizedString } from '../utils/resolve_localized'

const ON_THIS_PAGE: LocalizedString = {
  en: 'On this page',
  pl: 'Na tej stronie',
}

const DOC_NAV_LABEL: LocalizedString = {
  en: 'Documentation navigation',
  pl: 'Nawigacja dokumentacji',
}

export function docsOnThisPageLabel(lang: string): string {
  return resolveLocalized(ON_THIS_PAGE, lang)
}

export function docsNavAriaLabel(lang: string): string {
  return resolveLocalized(DOC_NAV_LABEL, lang)
}
