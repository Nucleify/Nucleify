import type { App } from 'vue'
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

export function registerNucNavigation(app: App<Element>): void {
  app.component(
    'nuc-navigation-back-button',
    defineAsyncComponent({
      loader: () => import('./components/back-button.vue'),
      hydrate: hydrateOnVisible({ rootMargin: '100px' }),
    })
  )
}
