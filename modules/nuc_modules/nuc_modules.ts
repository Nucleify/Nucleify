import type { App } from 'vue'
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

export function registerNucModules(app: App<Element>): void {
  app
    .component(
      'nuc-modules-info',
      defineAsyncComponent({
        loader: () => import('./atomic/section/info/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-modules-settings',
      defineAsyncComponent({
        loader: () => import('./settings/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
}
