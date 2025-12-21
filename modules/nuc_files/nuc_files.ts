import type { App } from 'vue'
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

export function registerNucFiles(app: App<Element>): void {
  app
    .component(
      'nuc-file-dashboard',
      defineAsyncComponent({
        loader: () => import('./atomic/templates/Dashboard.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '100px' }),
      })
    )
    .component(
      'nuc-file-page',
      defineAsyncComponent({
        loader: () => import('./atomic/pages/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '100px' }),
      })
    )
}
