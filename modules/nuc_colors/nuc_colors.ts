import { defineNuxtPlugin } from 'nuxt/app'
import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

import { colorsClientPlugin, colorsServerPlugin } from './plugins'

export function registerNucColors(app: App<Element>): void {
  app
    /**
     *  Components
     */
    .component(
      'nuc-color-picker',
      defineAsyncComponent(
        () => import('./atomic/organism/color-picker/index.vue')
      )
    )
    .component(
      'nuc-color-settings-card',
      defineAsyncComponent(() => import('./atomic/template/settings-card.vue'))
    )

    /**
     *  Plugins
     */
    .use(colorsClientPlugin as typeof defineNuxtPlugin)
    .use(colorsServerPlugin as typeof defineNuxtPlugin)
}
