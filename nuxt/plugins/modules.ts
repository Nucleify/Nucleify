// @ts-nocheck
import type { NuxtApp } from 'nuxt/app'
import { defineNuxtPlugin } from 'nuxt/app'

import { registerNucActivity } from '../../modules/nuc_activity/nuc_activity'
import { registerNucCalendar } from '../../modules/nuc_calendar/nuc_calendar'
import { registerNucColors } from '../../modules/nuc_colors/nuc_colors'
import { registerNucDarkMode } from '../../modules/nuc_dark_mode/nuc_dark_mode'
import { registerNucDocumentation } from '../../modules/nuc_documentation/nuc_documentation'
import { registerNucDocuments } from '../../modules/nuc_documents/nuc_documents'
import { registerNucEntities } from '../../modules/nuc_entities/nuc_entities'
import { registerNucGlobals } from '../../modules/nuc_globals/nuc_globals'
import { registerNucLanguages } from '../../modules/nuc_languages/nuc_languages'
import { registerNucModules } from '../../modules/nuc_modules/nuc_modules'
import { registerNucPageBuilder } from '../../modules/nuc_pagebuilder/nuc_pagebuilder'
import { registerNucPages } from '../../modules/nuc_pages/nuc_pages'
import { registerNucUsers } from '../../modules/nuc_users/nuc_users'

export default defineNuxtPlugin({
  name: 'modules-registration',
  enforce: 'pre',
  setup(nuxtApp: NuxtApp) {
    registerNucGlobals(nuxtApp.vueApp)
    registerNucActivity(nuxtApp.vueApp)
    registerNucCalendar(nuxtApp.vueApp)
    registerNucColors(nuxtApp.vueApp)
    registerNucDarkMode(nuxtApp.vueApp)
    registerNucDocuments(nuxtApp.vueApp)
    registerNucDocumentation(nuxtApp.vueApp)
    registerNucEntities(nuxtApp.vueApp)
    registerNucLanguages(nuxtApp)
    registerNucModules(nuxtApp.vueApp)
    registerNucPageBuilder(nuxtApp.vueApp)
    registerNucPages(nuxtApp.vueApp)
    registerNucUsers(nuxtApp.vueApp)
  },
})
