import type { App } from 'vue'
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

export function registerNucAnimations(app: App<Element>): void {
  app
    .component(
      'nuc-animation-bounce',
      defineAsyncComponent({
        loader: () => import('./bounce/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '100px' }),
      })
    )
    .component(
      'nuc-animation-hexagons',
      defineAsyncComponent({
        loader: () => import('./hexagons/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '100px' }),
      })
    )
}
