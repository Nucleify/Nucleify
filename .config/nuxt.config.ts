import { defineNuxtConfig } from 'nuxt/config'

import { schemaOrgConfig } from './nuxt/schema-org'
import { appConfig } from './nuxt/app'
import { googleFontsConfig, iconConfig } from './nuxt/fonts-icon'
import { authConfig } from './nuxt/auth'
import { devConfig } from './nuxt/dev'
import { experimentalConfig } from './nuxt/experimental'
import { hooksConfig } from './nuxt/hooks'
import { i18nConfig, LOCALES } from './nuxt/locales'
import { modules } from './nuxt/modules'
import { nitroConfig } from './nuxt/nitro'
import { performanceConfig } from './nuxt/performance'
import { primevueConfig } from './nuxt/primevue'
import { getRouteRules } from './nuxt/route-rules'
import { runtimeConfig } from './nuxt/runtime'
import { structureConfig } from './nuxt/structure'
import { viteConfig } from './nuxt/vite'
import { featuresConfig } from './nuxt/features'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ...devConfig,
  modules,
  runtimeConfig,
  app: appConfig,
  routeRules: getRouteRules(LOCALES),
  schemaOrg: schemaOrgConfig,
  vite: viteConfig,
  experimental: experimentalConfig,
  primevue: primevueConfig,
  googleFonts: googleFontsConfig,
  features: featuresConfig,
  icon: iconConfig,
  i18n: i18nConfig,
  ...performanceConfig,
  ...structureConfig,
  ...authConfig,
  ...nitroConfig,
  ...hooksConfig,
  // biome-ignore lint/suspicious/noExplicitAny: Nuxt config complexity @typescript-eslint/no-explicit-any
} as any)
