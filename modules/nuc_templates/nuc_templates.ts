import type { App } from 'vue'
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

export function registerNucTemplates(app: App<Element>): void {
  app
    .component(
      'nuc-authors',
      defineAsyncComponent({
        loader: () => import('./components/authors/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-card-box',
      defineAsyncComponent({
        loader: () => import('./components/card/boxes/components/Box.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-card-boxes',
      defineAsyncComponent({
        loader: () => import('./components/card/boxes/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-card-category',
      defineAsyncComponent({
        loader: () => import('./components/card/category/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-cube',
      defineAsyncComponent({
        loader: () => import('./components/cube/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-flip-card',
      defineAsyncComponent({
        loader: () => import('./components/card/flip/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-home-link',
      defineAsyncComponent({
        loader: () => import('./components/home-link/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-tiles',
      defineAsyncComponent({
        loader: () => import('./components/tiles/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
}
