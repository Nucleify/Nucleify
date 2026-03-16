export const modules = [
  './modules/nuc_overrides',
  './modules/nuc_pagebuilder',
  '@nuxt/icon',
  '@nuxtjs/critters',
  '@nuxtjs/google-fonts',
  '@nuxtjs/i18n',
  '@nuxtjs/robots',
  '@nuxtjs/sitemap',
  '@pinia/nuxt',
  '@primevue/nuxt-module',
  '@radya/nuxt-dompurify',
  '@qirolab/nuxt-sanctum-authentication',
  'nuxt-schema-org',
  'nuxt-seo-utils',
  'nuxt-swiper',
  'nuxt-vitalizer',
  'pinia-plugin-persistedstate/nuxt',
  ...(process.env.APP_ENV === 'local'
    ? [
        '@nuxt/test-utils/module',
        '@nuxtjs/stylelint-module',
        'nuxt-link-checker',
      ]
    : []),
]
