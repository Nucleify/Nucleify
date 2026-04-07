/** Konfiguracja fontów (Google Fonts) i ikon (@nuxt/icon) */
export const googleFontsConfig = {
  families: {
    Inter: '300..700',
  },
  display: 'swap' as const,
  subsets: ['latin'],
  preload: true,
  prefetch: false,
  preconnect: false,
  download: true,
  base64: false,
}

export const iconConfig = {
  mode: 'svg' as const,
  serverBundle: {
    collections: ['prime', 'mdi'],
  },
  clientBundle: {
    scan: true,
    sizeLimitKb: 256,
  },
}
