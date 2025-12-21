import type { App } from 'vue'
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

export function registerNucDataTable(app: App<Element>): void {
  app
    .component(
      'nuc-entity-datatable',
      defineAsyncComponent({
        loader: () => import('./atomic/templates/entity-datatable/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-entity-datatable-card',
      defineAsyncComponent({
        loader: () =>
          import('./atomic/templates/entity-datatable-card/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
    .component(
      'nuc-entity-datatable-skeleton',
      defineAsyncComponent({
        loader: () =>
          import('./atomic/templates/entity-datatable-skeleton/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '500px' }),
      })
    )
}
