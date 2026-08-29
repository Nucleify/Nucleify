import { defineNuxtConfig } from 'nuxt/config'
import { resolve } from 'node:path'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  srcDir: 'src',
  serverDir: 'src/server',
  alias: {
    'portable/nui': resolve(process.cwd(), '../portable/nui'),
  },
})
