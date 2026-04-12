// @ts-nocheck
import type { NuxtApp } from 'nuxt/app'
import { defineNuxtPlugin } from 'nuxt/app'

import { registerNucGlobals } from 'nucleify'

import {
  registerNucActivity,
  registerNucAdmin,
  registerNucAnimations,
  registerNucAuth,
  registerNucCharts,
  registerNucColors,
  registerNucDarkMode,
  registerNucDataTable,
  registerNucDialog,
  registerNucDock,
  registerNucDocumentation,
  registerNucEntities,
  registerNucEntitiesStructural,
  registerNucFiles,
  registerNucFriendship,
  registerNucLanguages,
  registerNucModules,
  registerNucNavigation,
  registerNucPageBuilder,
  registerNucPages,
  registerNucPricings,
  registerNucScreenLoader,
  registerNucSections,
  registerNucSettings,
  registerNucShare,
  registerNucSocials,
  registerNucTemplates,
  registerNucTerminal,
  registerNucTime,
  registerNucTooltip,
  registerNucUsers,
} from '../../modules'

export default defineNuxtPlugin({
  name: 'modules-registration',
  enforce: 'pre',
  setup(nuxtApp: NuxtApp) {
    registerNucGlobals(nuxtApp.vueApp)
    registerNucActivity(nuxtApp.vueApp)
    registerNucAdmin(nuxtApp.vueApp)
    registerNucAnimations(nuxtApp.vueApp)
    registerNucAuth(nuxtApp.vueApp)
    registerNucCharts(nuxtApp.vueApp)
    registerNucColors(nuxtApp.vueApp)
    registerNucDarkMode(nuxtApp.vueApp)
    registerNucDataTable(nuxtApp.vueApp)
    registerNucDialog(nuxtApp.vueApp)
    registerNucDock(nuxtApp.vueApp)
    registerNucDocumentation(nuxtApp.vueApp)
    registerNucEntities(nuxtApp.vueApp)
    registerNucEntitiesStructural(nuxtApp.vueApp)
    registerNucFiles(nuxtApp.vueApp)
    registerNucFriendship(nuxtApp.vueApp)
    registerNucLanguages(nuxtApp)
    registerNucModules(nuxtApp.vueApp)
    registerNucNavigation(nuxtApp.vueApp)
    registerNucPageBuilder(nuxtApp.vueApp)
    registerNucPages(nuxtApp.vueApp)
    registerNucPricings(nuxtApp.vueApp)
    registerNucScreenLoader(nuxtApp.vueApp)
    registerNucSections(nuxtApp.vueApp)
    registerNucSettings(nuxtApp.vueApp)
    registerNucShare(nuxtApp.vueApp)
    registerNucSocials(nuxtApp.vueApp)
    registerNucTemplates(nuxtApp.vueApp)
    registerNucTerminal(nuxtApp.vueApp)
    registerNucTime(nuxtApp.vueApp)
    registerNucTooltip(nuxtApp.vueApp)
    registerNucUsers(nuxtApp.vueApp)
  },
})
