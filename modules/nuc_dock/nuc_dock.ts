import type { App } from 'vue'
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

export function registerNucDock(app: App<Element>): void {
  app.component(
    'nuc-dock',
    defineAsyncComponent({
      loader: () => import('./index.vue'),
      hydrate: hydrateOnVisible({ rootMargin: '500px' }),
    })
  )
}
