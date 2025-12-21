import type { App } from 'vue'
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

export function registerNucSettings(app: App<Element>): void {
  app
    .component(
      'nuc-settings-card',
      defineAsyncComponent({
        loader: () => import('./components/card/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-settings-page',
      defineAsyncComponent({
        loader: () => import('./index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-skeleton-settings-card',
      defineAsyncComponent({
        loader: () => import('./components/card/skeleton.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-menu-tree',
      defineAsyncComponent({
        loader: () => import('./components/menu-tree/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-general-menu-tree',
      defineAsyncComponent({
        loader: () => import('./components/menu-tree/general/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-staff-menu-tree',
      defineAsyncComponent({
        loader: () => import('./components/menu-tree/staff/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-settings-card-content',
      defineAsyncComponent({
        loader: () => import('./components/content/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
}
