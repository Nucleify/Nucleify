export const LOCALES = [
  { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
  { code: 'pl', language: 'pl-PL', file: 'pl.json', name: 'Polski' },
  { code: 'vn', language: 'vi-VN', file: 'vn.json', name: 'Tiếng Việt' },
] as const

export const i18nConfig = {
  locales: [...LOCALES],
  defaultLocale: 'en',
  lazy: true,
  langDir: '../modules/nuc_languages/locales',
  strategy: 'no_prefix',
  detectBrowserLanguage: false,
  compilation: {
    strictMessage: false,
  },
  bundle: {
    compositionOnly: true,
    fullInstall: false,
  },
}
