import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

export function registerNucCharts(app: App<Element>): void {
  app
    .component(
      'nuc-entity-chart',
      defineAsyncComponent(
        () => import('./atomic/template/entity-chart/index.vue')
      )
    )
    .component(
      'nuc-entity-chart-card',
      defineAsyncComponent(
        () => import('./atomic/template/entity-chart-card/index.vue')
      )
    )
    .component(
      'nuc-chart-settings-card',
      defineAsyncComponent(
        () => import('./atomic/template/chart-settings-card/index.vue')
      )
    )
}
