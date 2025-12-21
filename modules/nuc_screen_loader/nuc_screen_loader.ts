import type { App } from 'vue'
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

export function registerNucScreenLoader(app: App<Element>): void {
  app.component(
    'nuc-screen-loader',
    defineAsyncComponent({
      loader: () => import('./index.vue'),
      hydrate: hydrateOnVisible({ rootMargin: '100px' }),
    })
  )
}
