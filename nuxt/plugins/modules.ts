// @ts-nocheck
import type { NuxtApp } from 'nuxt/app'
import { defineNuxtPlugin } from 'nuxt/app'

import { registerNucGlobals } from 'atomic'

import {
  registerDMTime,
  registerDMTooltip,
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
  registerNucModules,
  registerNucNavigation,
  registerNucPages,
  registerNucPerformance,
  registerNucScreenLights,
  registerNucScreenLoader,
  registerNucSections,
  registerNucSettings,
  registerNucTasks,
  registerNucTemplates,
} from '../../modules'

export default defineNuxtPlugin({
  name: 'modules-registration',
  enforce: 'pre',
  setup(nuxtApp: NuxtApp) {
    registerNucGlobals(nuxtApp.vueApp)
    registerDMTime(nuxtApp.vueApp)
    registerDMTooltip(nuxtApp.vueApp)
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
    registerNucModules(nuxtApp.vueApp)
    registerNucNavigation(nuxtApp.vueApp)
    registerNucPages(nuxtApp.vueApp)
    registerNucPerformance(nuxtApp.vueApp)
    registerNucScreenLights(nuxtApp.vueApp)
    registerNucScreenLoader(nuxtApp.vueApp)
    registerNucSections(nuxtApp.vueApp)
    registerNucSettings(nuxtApp.vueApp)
    registerNucTasks(nuxtApp.vueApp)
    registerNucTemplates(nuxtApp.vueApp)
  },
})
