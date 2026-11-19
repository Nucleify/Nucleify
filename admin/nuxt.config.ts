import './.config/nuxt/load-env'

import { defineNuxtConfig } from 'nuxt/config'

import { devConfig } from './.config/nuxt/dev'
import { hooksConfig } from './.config/nuxt/hooks'
import { nitroConfig } from './.config/nuxt/nitro'
import { runtimeConfig } from './.config/nuxt/runtime'
import { structureConfig } from './.config/nuxt/structure'
import { viteConfig } from './.config/nuxt/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ...devConfig,
  runtimeConfig,
  vite: viteConfig,
  ...structureConfig,
  ...nitroConfig,
  ...hooksConfig,
  // biome-ignore lint/suspicious/noExplicitAny: Nuxt config complexity @typescript-eslint/no-explicit-any
} as any)
