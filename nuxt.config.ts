import { defineNuxtConfig } from 'nuxt/config'
import Lara from '@primeuix/themes/lara'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@nuxtjs/robots',
    '@nuxtjs/seo',
    '@nuxtjs/sitemap',
    '@nuxtjs/stylelint-module',
    '@primevue/nuxt-module',
    'nuxt-link-checker',
    'nuxt-og-image',
    'nuxt-schema-org',
    'nuxt-seo-utils',
    'nuxt-swiper'
  ],
  ssr: true,
  nitro: {
    prerender: {
      routes: ['/'],
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
      title: 'NuxtStarter',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600&display=swap'
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
    { path: '~/components', extensions: ['vue'] },
    { path: '~/atomic', extensions: ['vue'] },
    { path: 'modules', extensions: ['vue'], pathPrefix: false }
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
    options: {
      theme: {
        preset: Lara
      }
    }
  },
  runtimeConfig: {
    public: {
      appUrl: process.env.APP_URL,
      apiUrl: process.env.API_URL
    }
  }
} as any)