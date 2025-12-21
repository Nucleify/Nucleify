import type { App } from 'vue'
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

export function registerNucDialog(app: App<Element>): void {
  app.component(
    'nuc-dialog',
    defineAsyncComponent({
      loader: () => import('./index.vue'),
      hydrate: hydrateOnVisible({ rootMargin: '100px' }),
    })
  )
}
