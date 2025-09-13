import { defineNuxtConfig } from 'nuxt/config'

import Lara from '@primeuix/themes/lara'
import { definePerson } from 'nuxt-schema-org/schema'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/icon',
    '@nuxt/test-utils/module',
    '@nuxtjs/google-fonts',
    '@nuxtjs/i18n',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxtjs/storybook',
    '@nuxtjs/stylelint-module',
    '@pinia/nuxt',
    '@primevue/nuxt-module',
    '@radya/nuxt-dompurify',
    '@qirolab/nuxt-sanctum-authentication',
    'nuxt-link-checker',
    'nuxt-schema-org',
    'nuxt-seo-utils',
    'nuxt-swiper',
    'nuxt-vitalizer',
    'pinia-plugin-persistedstate/nuxt',
  ],
  laravelSanctum: {
    apiUrl: process.env.APP_URL,
  },
  ssr: process.env.SSR === 'true',
  nitro: {
    prerender: process.env.CI
      ? {
          routes: [],
          crawlLinks: false,
        }
      : {
          routes: process.env.PRERENDER_ROUTES
            ? process.env.PRERENDER_ROUTES.split(',').map((r) => r.trim())
            : [],
          crawlLinks: process.env.PRERENDER_CRAWL_LINKS === 'true',
          ignore: process.env.PRERENDER_IGNORE
            ? process.env.PRERENDER_IGNORE.split(',').map((r) => r.trim())
            : [],
        },
    output: {
      publicDir: './public/build',
    },
    minify: true,
    compressPublicAssets: true,
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title:
        'DataManager – Laravel/Nuxt ERP with Modular Design and Next-gen Architecture',
      titleTemplate: '%s',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
  schemaOrg: {
    identity: definePerson({
      name: 'Szymon Radomski',
      alternateName: 'SzymCode',
      image: '/img/contributors/szymcode.svg',
      url: 'https://github.com/SzymCode',
      sameAs: ['https://github.com/SzymCode'],
    }),
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 1600,
      rollupOptions: {
        output: {
          manualChunks: {
            primevue: ['primevue'],
            vue: ['vue', 'vue-router'],
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: [
            'mixed-decls',
            'import',
            'color-functions',
            'global-builtin',
          ],
        },
      },
    },
    optimizeDeps: {
      include: ['vue', 'vue-router', 'primevue'],
    },
  },
  alias: {
    atomic: '~/atomic',
  },
  components: [
    { path: '~/atomic/atom', prefix: 'ad', extensions: ['vue'] },
    { path: '~/atomic/molecule', prefix: 'ad', extensions: ['vue'] },
    { path: '~/atomic/organism', prefix: 'ad', extensions: ['vue'] },
    { path: '~/atomic/section', prefix: 'ad-section', extensions: ['vue'] },
    { path: '~/atomic/template', prefix: 'ad', extensions: ['vue'] },
    { path: '~/atomic', extensions: ['vue'] },
  ],
  imports: {
    dirs: ['~/composables/**', '~/atomic/**', 'modules/**'],
  },
  srcDir: 'nuxt',
  publicDir: './public',
  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true,
  },
  primevue: {
    autoImport: true,
    options: {
      theme: {
        preset: Lara,
      },
      ripple: true,
    },
  },
  runtimeConfig: {
    public: {
      appUrl: process.env.APP_URL,
      apiUrl: process.env.API_URL,
      appEnv: process.env.APP_ENV,
    },
  },
  vitalizer: {
    disableStylesheets: 'entry',
  },
  googleFonts: {
    families: {
      Inter: '300..700',
      Nunito: '300..700',
    },
    display: 'swap',
    subsets: ['latin'],
  },
  storybook: {
    url: 'http://localhost',
    port: 6006,
  },
  icon: {
    prefix: 'i-prime',
    mode: 'css',
  },
  i18n: {
    defaultLocale: 'en',
    lazy: true,
    strategy: 'prefix',
    langDir: '../modules/dm_languages/locales/',
    customRoutes: 'config',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
      { code: 'pl', iso: 'pl-PL', name: 'Polski', file: 'pl.json' },
    ],
    pages: {
      home: {
        en: '/home',
        pl: '/strona-glowna',
      },
      about: {
        en: '/about',
        pl: '/o-nas',
      },
      services: {
        en: '/services',
        pl: '/uslugi',
      },
      blog: {
        en: '/blog',
        pl: '/blog',
      },
      login: {
        en: '/login',
        pl: '/logowanie',
      },
      register: {
        en: '/register',
        pl: '/rejestracja',
      },
      admin: {
        en: '/admin',
        pl: '/panel-admina',
      },
      structural: {
        en: '/structural',
        pl: '/strukturalne',
      },
      dashboard: {
        en: '/dashboard',
        pl: '/pulpit',
      },
      entities: {
        en: '/entities',
        pl: '/obiekty',
      },
      'activity-log': {
        en: '/activity-log',
        pl: '/dziennik-aktywnosci',
      },
      messages: {
        en: '/messages',
        pl: '/wiadomosci',
      },
      calender: {
        en: '/calendar',
        pl: '/kalendarz',
      },
      profile: {
        en: '/profile',
        pl: '/profil',
      },
      settings: {
        en: '/settings',
        pl: '/ustawienia',
      },
      'structural/cards': {
        en: '/structural/cards',
        pl: '/strukturalne/karty',
      },
      'structural/features': {
        en: '/structural/features',
        pl: '/strukturalne/funkcjonalnosci',
      },
      'structural/questions': {
        en: '/structural/questions',
        pl: '/strukturalne/pytania',
      },
      'structural/technologies': {
        en: '/structural/technologies',
        pl: '/strukturalne/technologie',
      },
      'structural/links': {
        en: '/structural/links',
        pl: '/strukturalne/linki',
      },
      'entities/articles': {
        en: '/entities/articles',
        pl: '/obiekty/artykuly',
      },
      'entities/contacts': {
        en: '/entities/contacts',
        pl: '/obiekty/kontakty',
      },
      'entities/money': {
        en: '/entities/money',
        pl: '/obiekty/finanse',
      },
    },
  },
  // biome-ignore lint/suspicious/noExplicitAny: Nuxt config complexity @typescript-eslint/no-explicit-any
} as any)
