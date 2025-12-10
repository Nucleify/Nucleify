// @ts-nocheck
import type { NuxtApp } from 'nuxt/app'
import { defineNuxtPlugin } from 'nuxt/app'

import { registerDMGlobals } from 'atomic'

import {
  registerDMDocumentation,
  registerDMEntities,
  registerDMEntitiesStructural,
  registerDMFiles,
  registerDMFriendship,
  registerDMModules,
  registerDMNavigation,
  registerDMPages,
  registerDMPerformance,
  registerDMScreenLights,
  registerDMScreenLoader,
  registerDMSections,
  registerDMSettings,
  registerDMTasks,
  registerDMTemplates,
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
} from '../../modules'

export default defineNuxtPlugin({
  name: 'modules-registration',
  enforce: 'pre',
  setup(nuxtApp: NuxtApp) {
    registerDMDocumentation(nuxtApp.vueApp)
    registerDMEntities(nuxtApp.vueApp)
    registerDMEntitiesStructural(nuxtApp.vueApp)
    registerDMFiles(nuxtApp.vueApp)
    registerDMFriendship(nuxtApp.vueApp)
    registerDMGlobals(nuxtApp.vueApp)
    registerDMModules(nuxtApp.vueApp)
    registerDMNavigation(nuxtApp.vueApp)
    registerDMPages(nuxtApp.vueApp)
    registerDMPerformance(nuxtApp.vueApp)
    registerDMScreenLights(nuxtApp.vueApp)
    registerDMScreenLoader(nuxtApp.vueApp)
    registerDMSections(nuxtApp.vueApp)
    registerDMSettings(nuxtApp.vueApp)
    registerDMTasks(nuxtApp.vueApp)
    registerDMTemplates(nuxtApp.vueApp)
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
  },
})
