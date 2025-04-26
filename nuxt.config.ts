import { defineNuxtConfig } from 'nuxt/config'

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
    'nuxt-link-checker',
    'nuxt-og-image',
    'nuxt-schema-org',
    'nuxt-seo-utils'
  ],
  ssr: true,
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true
    },
    output: {
      publicDir: './public/build'
    }
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
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern",
        },
      }
    }
  },
  components: [
    { path: '~/nuxt/components', extensions: ['vue'] }
  ],
  ignore: [
    'modules/**/*'
  ],
  srcDir: 'nuxt',
  publicDir: './public',
  experimental: {
    appManifest: false,
  },
})