export type LocalizedString = string | { en: string; pl: string }

export function resolveLocalized(
  value: LocalizedString,
  lang: string,
): string {
  if (typeof value === 'string') return value
  if (lang === 'pl') return value.pl
  return value.en
}
