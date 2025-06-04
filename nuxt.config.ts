import { defineNuxtConfig } from 'nuxt/config'
import Lara from '@primeuix/themes/lara'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@nuxtjs/google-fonts',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxtjs/storybook',
    '@nuxtjs/stylelint-module',
    '@primevue/nuxt-module',
    '@radya/nuxt-dompurify',
    'nuxt-link-checker',
    'nuxt-schema-org',
    'nuxt-seo-utils',
    'nuxt-swiper',
    'nuxt-vitalizer',
    '@qirolab/nuxt-sanctum-authentication'
  ],
  laravelSanctum: {
    apiUrl: process.env.APP_URL,
  },
  ssr: true,
  nitro: {
    prerender: {
      routes: ['/home'],
      crawlLinks: true
    },
    output: {
      publicDir: './public/build'
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'DataManager – Laravel/Nuxt ERP with Modular Design and Next-gen Architecture',
      titleTemplate: '%s',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: '/fonts/primeicons/primeicons.css'
        }
      ]
    },
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 1600
    },
    css: {
      preprocessorOptions: {
        scss: {
          silenceDeprecations: [
            "mixed-decls",
            "import",
            "color-functions",
            "global-builtin",
          ],
        },
      },
    },
  },
  alias: {
    'atomic': '~/atomic'
  },
  components: [
    { path: '~/atomic/atom', prefix: 'ad', extensions: ['vue'] },
    { path: '~/atomic/molecule', prefix: 'ad', extensions: ['vue'] },
    { path: '~/atomic/organism', prefix: 'ad', extensions: ['vue'] },
    { path: '~/atomic/section', prefix: 'ad-section', extensions: ['vue'] },
    { path: '~/atomic/template', prefix: 'ad', extensions: ['vue'] },
    { path: '~/atomic', extensions: ['vue'] }
  ],
  imports: {
    dirs: [
      '~/composables/**',
      '~/atomic/**',
      'modules/**'
    ]
  },
  srcDir: 'nuxt',
  publicDir: './public',
  experimental: {
    appManifest: false,
  },
  primevue: {
    autoImport: true,
    options: {
      theme: {
        preset: Lara
      },
      ripple: true
    }
  },
  css: ["primeicons/primeicons.css"],
  runtimeConfig: {
    public: {
      appUrl: process.env.APP_URL,
      apiUrl: process.env.API_URL,
      appEnv: process.env.APP_ENV
    }
  },
  vitalizer: {
    disableStylesheets: 'entry'
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
    port: 6006
  },
})