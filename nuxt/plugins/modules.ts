// @ts-nocheck
import type { NuxtApp } from 'nuxt/app'
import { defineNuxtPlugin } from 'nuxt/app'

import { registerDMGlobals } from 'atomic'

import {
  registerDMActivity,
  registerDMAdmin,
  registerDMAnimations,
  registerDMAuth,
  registerDMCharts,
  registerDMColors,
  registerDMDataTable,
  registerDMDocumentation,
  registerDMEntities,
  registerDMEntitiesStructural,
  registerDMFiles,
  registerDMFriendship,
  registerDMMedia,
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
} from '../../modules'

export default defineNuxtPlugin({
  name: 'modules-registration',
  enforce: 'pre',
  setup(nuxtApp: NuxtApp) {
    registerDMActivity(nuxtApp.vueApp)
    registerDMAdmin(nuxtApp.vueApp)
    registerDMAnimations(nuxtApp.vueApp)
    registerDMAuth(nuxtApp.vueApp)
    registerDMColors(nuxtApp.vueApp)
    registerDMCharts(nuxtApp.vueApp)
    registerDMDataTable(nuxtApp.vueApp)
    registerDMDocumentation(nuxtApp.vueApp)
    registerDMEntities(nuxtApp.vueApp)
    registerDMEntitiesStructural(nuxtApp.vueApp)
    registerDMFiles(nuxtApp.vueApp)
    registerDMFriendship(nuxtApp.vueApp)
    registerDMGlobals(nuxtApp.vueApp)
    registerDMMedia(nuxtApp.vueApp)
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
  },
})
