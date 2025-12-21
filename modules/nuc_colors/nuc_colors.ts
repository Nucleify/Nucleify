import { defineNuxtPlugin } from 'nuxt/app'
import type { App } from 'vue'
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

import { colorsClientPlugin, colorsServerPlugin } from './plugins'

export function registerNucColors(app: App<Element>): void {
  app
    /**
     *  Components
     */
    .component(
      'nuc-color-picker',
      defineAsyncComponent({
        loader: () => import('./atomic/organism/color-picker/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-color-settings-card',
      defineAsyncComponent({
        loader: () => import('./atomic/template/settings-card.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )

    /**
     *  Plugins
     */
    .use(colorsClientPlugin as typeof defineNuxtPlugin)
    .use(colorsServerPlugin as typeof defineNuxtPlugin)
}
