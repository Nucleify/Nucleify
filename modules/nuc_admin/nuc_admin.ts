import type { App } from 'vue'
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

export function registerNucAdmin(app: App<Element>): void {
  app.component(
    'nuc-admin-page',
    defineAsyncComponent({
      loader: () => import('./atomic/pages/index.vue'),
      hydrate: hydrateOnVisible({ rootMargin: '100px' }),
    })
  )
}
