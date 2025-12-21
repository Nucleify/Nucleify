import type { App } from 'vue'
import { defineAsyncComponent, hydrateOnVisible } from 'vue'

export function registerNucCharts(app: App<Element>): void {
  app
    .component(
      'nuc-entity-chart',
      defineAsyncComponent({
        loader: () => import('./atomic/template/entity-chart/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '100px' }),
      })
    )
    .component(
      'nuc-entity-chart-card',
      defineAsyncComponent({
        loader: () => import('./atomic/template/entity-chart-card/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '100px' }),
      })
    )
    .component(
      'nuc-chart-settings-card',
      defineAsyncComponent({
        loader: () => import('./atomic/template/chart-settings-card/index.vue'),
        hydrate: hydrateOnVisible({ rootMargin: '100px' }),
      })
    )
}
