import type { NuxtApp } from 'nuxt/app'
import { defineNuxtPlugin } from 'nuxt/app'
import {
  registerDMActivity,
  registerDMAnimations,
  registerDMAuth,
  registerDMEntities,
  registerDMEntitiesStructural,
  registerDMMedia,
  registerDMPages,
  registerDMScreenLights,
  registerDMScreenLoader,
  registerDMTasks,
} from '../../modules'

export default defineNuxtPlugin({
  name: 'modules-registration',
  enforce: 'pre',
  setup(nuxtApp: NuxtApp) {
    registerDMActivity(nuxtApp.vueApp)
    registerDMAnimations(nuxtApp.vueApp)
    registerDMAuth(nuxtApp.vueApp)
    registerDMEntities(nuxtApp.vueApp)
    registerDMEntitiesStructural(nuxtApp.vueApp)
    registerDMMedia(nuxtApp.vueApp)
    registerDMPages(nuxtApp.vueApp)
    registerDMScreenLights(nuxtApp.vueApp)
    registerDMScreenLoader(nuxtApp.vueApp)
    registerDMTasks(nuxtApp.vueApp)
  },
})
