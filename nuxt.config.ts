import { defineNuxtConfig } from 'nuxt/config'

import Lara from '@primeuix/themes/lara'
import { schemaOrgConfig } from './nuxt/config/schema-org'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    './modules/nuc_overrides',
    '@nuxt/icon',
    '@nuxt/test-utils/module',
    '@nuxtjs/google-fonts',
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
      ],
    },
  },
  schemaOrg: schemaOrgConfig,
  vite: {
    build: {
      chunkSizeWarningLimit: 1600,
      minify: 'terser',
      cssCodeSplit: process.env.NODE_ENV === 'production',
      rollupOptions: {
        maxParallelFileOps: 2,
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', '@unhead/vue'],
            pinia: ['pinia', 'pinia-plugin-persistedstate'],
            primevue: ['primevue', '@primevue/forms', '@primeuix/themes'],
            chartjs: ['chart.js'],
            gsap: ['gsap'],
            marked: ['marked'],
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
  },
  primevue: {
    autoImport: true,
    options: {
      theme: {
        preset: Lara,
        options: {
          darkModeSelector: '.p-dark',
        },
      },
      ripple: true,
      cssLayer: {
        name: 'primevue',
        order: 'app-styles, primevue',
      },
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
  // biome-ignore lint/suspicious/noExplicitAny: Nuxt config complexity @typescript-eslint/no-explicit-any
} as any)
