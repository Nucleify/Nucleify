import type { NuxtApp } from 'nuxt/app'
import { defineNuxtPlugin } from 'nuxt/app'
import {
  registerDMActivity,
  registerDMAnimations,
  registerDMAuth,
  registerDMCharts,
  registerDMColors,
  registerDMEntities,
  registerDMEntitiesStructural,
  registerDMFiles,
  registerDMMedia,
  registerDMPages,
  registerDMScreenLights,
  registerDMScreenLoader,
  registerDMSettings,
  registerDMTasks,
} from '../../modules'

export default defineNuxtPlugin({
  name: 'modules-registration',
  enforce: 'pre',
  setup(nuxtApp: NuxtApp) {
    registerDMActivity(nuxtApp.vueApp)
    registerDMAnimations(nuxtApp.vueApp)
    registerDMAuth(nuxtApp.vueApp)
    registerDMColors(nuxtApp.vueApp)
    registerDMCharts(nuxtApp.vueApp)
    registerDMEntities(nuxtApp.vueApp)
    registerDMEntitiesStructural(nuxtApp.vueApp)
    registerDMFiles(nuxtApp.vueApp)
    registerDMMedia(nuxtApp.vueApp)
    registerDMPages(nuxtApp.vueApp)
    registerDMScreenLights(nuxtApp.vueApp)
    registerDMScreenLoader(nuxtApp.vueApp)
    registerDMSettings(nuxtApp.vueApp)
    registerDMTasks(nuxtApp.vueApp)
  },
})
