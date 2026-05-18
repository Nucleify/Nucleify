export type NucLocaleOption = {
  code: string
  language: string
  file: string
  name: string
}

export const NUC_LOCALES: NucLocaleOption[] = [
  { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
  { code: 'pl', language: 'pl-PL', file: 'pl.json', name: 'Polski' },
  { code: 'vn', language: 'vi-VN', file: 'vn.json', name: 'Tiếng Việt' },
]
