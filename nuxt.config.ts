import { defineNuxtConfig } from 'nuxt/config'

import Lara from '@primeuix/themes/lara'
import { definePerson } from 'nuxt-schema-org/schema'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
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
  ssr: true,
  nitro: {
    prerender: process.env.CI
      ? {
          enabled: false,
        }
      : {
          routes: ['/home', '/settings'],
          crawlLinks: true,
        },
    output: {
      publicDir: './public/build',
    },
    minify: true,
    compressPublicAssets: true,
    experimental: {
      wasm: true,
    },
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
      link: [
        {
          rel: 'stylesheet',
          href: '/fonts/primeicons/primeicons.css',
        },
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
  css: ['primeicons/primeicons.css'],
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
  // biome-ignore lint/suspicious/noExplicitAny: Nuxt module configurations require any type
} as any)
