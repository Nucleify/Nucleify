import type { App } from 'vue'
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

export function registerNucTime(app: App<Element>): void {
  app.component(
    'nuc-time-countdown',
    defineAsyncComponent({
      loader: () => import('./components/countdown.vue'),
      hydrate: hydrateOnVisible({ rootMargin: '500px' }),
    })
  )
}
