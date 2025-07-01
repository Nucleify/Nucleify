import { NuxtApp, defineNuxtPlugin } from 'nuxt/app'

import { registerDMActivity } from '../modules/dm_activity'
import { registerDMAnimations } from '../modules/dm_animations'
import { registerDMAuth } from '../modules/dm_auth'
import { registerDMEntities } from '../modules/dm_entities'
import { registerDMEntitiesStructural } from '../modules/dm_entities_structural'
import { registerDMLanguages } from '../modules/dm_languages'
import { registerDMMedia } from '../modules/dm_media'
import { registerDMPages } from '../modules/dm_pages'
import { registerDMScreenLights } from '../modules/dm_screen_lights'
import { registerDMScreenLoader } from '../modules/dm_screen_loader'

export default defineNuxtPlugin({
  name: 'modules-registration',
  enforce: 'pre',
  setup(nuxtApp: NuxtApp) {
    registerDMActivity(nuxtApp.vueApp)
    registerDMAnimations(nuxtApp.vueApp)
    registerDMAuth(nuxtApp.vueApp)
    registerDMEntities(nuxtApp.vueApp)
    registerDMEntitiesStructural(nuxtApp.vueApp)
    registerDMLanguages(nuxtApp.vueApp)
    registerDMMedia(nuxtApp.vueApp)
    registerDMPages(nuxtApp.vueApp)
    registerDMScreenLights(nuxtApp.vueApp)
    registerDMScreenLoader(nuxtApp.vueApp)
  },
})
