import { defineNuxtConfig } from 'nuxt/config'

import Lara from '@primeuix/themes/lara'
import { schemaOrgConfig } from './nuxt/config/schema-org'
import '@primevue/core/basecomponent/style'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    './modules/nuc_overrides',
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
    ...(process.env.NODE_ENV === 'local'
      ? [
          '@nuxt/test-utils/module',
          '@nuxtjs/storybook',
          '@nuxtjs/stylelint-module',
          'nuxt-link-checker',
        ]
      : []),
  ],
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English' },
      { code: 'pl', language: 'pl-PL', name: 'Polski' },
    ],
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
  },
  critters: {
    config: {
      preload: 'media',
      inlineFonts: false,
      preloadFonts: false,
      pruneSource: false,
      mergeStylesheets: true,
      reduceInlineStyles: true,
      keyframes: 'all',
      compress: true,
    },
  },
  laravelSanctum: {
    apiUrl: process.env.APP_URL,
  },
  ssr: process.env.SSR === 'true',
  nitro: {
    moduleSideEffects: ['@primevue/core/basecomponent/style'],
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
      publicDir: './.output/public',
    },
  },
  app: {
    head: {
      htmlAttrs: {},
      title: 'Nucleify - Modular Web Framework for Laravel & Nuxt',
      titleTemplate: '%s',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Create scalable web apps faster with Nucleify - a modular, core-driven framework with unique modules for Laravel & Nuxt developers.',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
      ],
    },
  },
  schemaOrg: schemaOrgConfig,
  vite: {
    build: {
      chunkSizeWarningLimit: 1600,
      minify: 'terser',
      cssCodeSplit: true,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        maxParallelFileOps: 2,
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', '@unhead/vue', 'vue-i18n'],
            pinia: ['pinia', 'pinia-plugin-persistedstate'],
            primevue: ['primevue', '@primevue/forms', '@primeuix/themes'],
            chartjs: ['chart.js'],
            gsap: ['gsap'],
            marked: ['marked'],
            highlightjs: ['highlight.js'],
            swiper: ['swiper'],
            dompurify: ['dompurify'],
            iconify: ['@iconify/vue', '@iconify/utils', '@iconify/types'],
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "~/assets/index";`,
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
  ],
  imports: {
    dirs: ['~/composables/**', '~/atomic/**', 'modules/**'],
  },
  srcDir: 'nuxt',
  publicDir: './public',
  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true,
    componentIslands: true,
    asyncContext: true,
  },
  css: ['~/assets/critical.css'],
  primevue: {
    options: {
      theme: {
        preset: Lara,
        options: {
          darkModeSelector: '.p-dark',
          cssLayer: {
            name: 'primevue',
            order: 'app-styles, primevue',
          },
        },
      },
      ripple: true,
    },
  },
  runtimeConfig: {
    public: {
      appUrl: process.env.APP_URL || 'https://nucleify.netlify.app',
      apiUrl: process.env.API_URL || 'https://nucleify.io/api',
      appEnv: process.env.APP_ENV || 'production',
    },
  },
  vitalizer: {
    disableStylesheets: false,
    disablePrefetchLinks: true,
  },
  googleFonts: {
    families: {
      Inter: '300..700',
    },
    display: 'swap',
    subsets: ['latin'],
    preload: true,
    prefetch: false,
    preconnect: true,
    download: true,
    base64: false,
  },
  storybook: {
    url: 'http://localhost',
    port: 6006,
  },
  icon: {
    mode: 'svg',
    serverBundle: {
      collections: ['prime', 'mdi'],
    },
    clientBundle: {
      scan: true,
      sizeLimitKb: 256,
    },
  },
  // biome-ignore lint/suspicious/noExplicitAny: Nuxt config complexity @typescript-eslint/no-explicit-any
} as any)
