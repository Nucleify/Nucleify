// @ts-nocheck
import type { NuxtApp } from 'nuxt/app'
import { defineNuxtPlugin } from 'nuxt/app'

import { registerNucGlobals } from 'atomic'

import {
  registerNucActivity,
  registerNucAdmin,
  registerNucAnimations,
  registerNucAuth,
  registerNucCharts,
  registerNucColors,
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
  registerNucPages,
  registerNucPerformance,
  registerNucPricings,
  registerNucScreenLights,
  registerNucScreenLoader,
  registerNucSections,
  registerNucSettings,
  registerNucShare,
  registerNucTemplates,
  registerNucTerminal,
  registerNucTime,
  registerNucTooltip,
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
    registerNucPages(nuxtApp.vueApp)
    registerNucPricings(nuxtApp.vueApp)
    registerNucPerformance(nuxtApp.vueApp)
    registerNucScreenLights(nuxtApp.vueApp)
    registerNucScreenLoader(nuxtApp.vueApp)
    registerNucSections(nuxtApp.vueApp)
    registerNucSettings(nuxtApp.vueApp)
    registerNucShare(nuxtApp.vueApp)
    registerNucTemplates(nuxtApp.vueApp)
    registerNucTerminal(nuxtApp.vueApp)
    registerNucTime(nuxtApp.vueApp)
    registerNucTooltip(nuxtApp.vueApp)
  },
})
