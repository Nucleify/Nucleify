// @ts-nocheck
import type { NuxtApp } from 'nuxt/app'
import { defineNuxtPlugin } from 'nuxt/app'

import { registerNucColors } from '../../../shared_modules/nuc_colors/nuc_colors'
import { registerNucDarkMode } from '../../../shared_modules/nuc_dark_mode/nuc_dark_mode'
import { registerNucGlobals } from '../../../shared_modules/nuc_globals/nuc_globals'
import { registerNucLanguages } from '../../../shared_modules/nuc_languages/nuc_languages'

export default defineNuxtPlugin({
  name: 'modules-registration',
  enforce: 'pre',
  setup(nuxtApp: NuxtApp) {
    registerNucGlobals(nuxtApp.vueApp)
    registerNucColors(nuxtApp.vueApp)
    registerNucDarkMode(nuxtApp.vueApp)
    registerNucLanguages(nuxtApp)
  },
})
