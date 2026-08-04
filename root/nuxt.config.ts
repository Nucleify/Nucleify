import './.config/nuxt/load-env'

import { defineNuxtConfig } from 'nuxt/config'

import { appConfig } from './.config/nuxt/app'
import { devConfig } from './.config/nuxt/dev'
import { experimentalConfig } from './.config/nuxt/experimental'
import { featuresConfig } from './.config/nuxt/features'
import { googleFontsConfig, iconConfig } from './.config/nuxt/fonts-icon'
import { hooksConfig } from './.config/nuxt/hooks'
import { i18nConfig, LOCALES } from './.config/nuxt/locales'
import { modules } from './.config/nuxt/modules'
import { nitroConfig } from './.config/nuxt/nitro'
import { performanceConfig } from './.config/nuxt/performance'
import { getRouteRules } from './.config/nuxt/route-rules'
import { runtimeConfig } from './.config/nuxt/runtime'
import { schemaOrgConfig } from './.config/nuxt/schema-org'
import { structureConfig } from './.config/nuxt/structure'
import { viteConfig } from './.config/nuxt/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ...devConfig,
  modules,
  runtimeConfig,
  app: appConfig,
  routeRules: getRouteRules(LOCALES),
  schemaOrg: schemaOrgConfig,
  vite: viteConfig,
  experimental: experimentalConfig,
  googleFonts: googleFontsConfig,
  features: featuresConfig,
  icon: iconConfig,
  i18n: i18nConfig,
  ...performanceConfig,
  ...structureConfig,
  ...nitroConfig,
  ...hooksConfig,
  // biome-ignore lint/suspicious/noExplicitAny: Nuxt config complexity @typescript-eslint/no-explicit-any
} as any)
