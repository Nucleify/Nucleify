import type { App } from 'vue'
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

export function registerNucActivity(app: App<Element>): void {
  app
    .component(
      'nuc-activity-page',
      defineAsyncComponent({
        loader: () => import('./atomic/pages/General/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-activity-dashboard',
      defineAsyncComponent({
        loader: () => import('./atomic/templates/Dashboard/General.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
}
