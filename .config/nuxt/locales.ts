export const LOCALES = [
  { code: 'en', language: 'en-US', name: 'English' },
  { code: 'pl', language: 'pl-PL', name: 'Polski' },
  { code: 'vn', language: 'vi-VN', name: 'Tiếng Việt' },
] as const

export const i18nConfig = {
  locales: [...LOCALES],
  defaultLocale: 'en',
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
