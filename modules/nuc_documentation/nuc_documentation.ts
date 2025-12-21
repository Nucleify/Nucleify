import type { App } from 'vue'
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

export function registerNucDocumentation(app: App<Element>): void {
  app
    .component(
      'nuc-documentation-page',
      defineAsyncComponent({
        loader: () => import('./atomic/pages/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-documentation-dashboard',
      defineAsyncComponent({
        loader: () => import('./atomic/templates/Dashboard.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
}
