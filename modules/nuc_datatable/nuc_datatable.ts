import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'

export function registerNucDataTable(app: App<Element>): void {
  app
    .component(
      'nuc-entity-datatable',
      defineAsyncComponent(
        () => import('./atomic/templates/entity-datatable/index.vue')
      )
    )
    .component(
      'nuc-entity-datatable-card',
      defineAsyncComponent(
        () => import('./atomic/templates/entity-datatable-card/index.vue')
      )
    )
    .component(
      'nuc-entity-datatable-skeleton',
      defineAsyncComponent(
        () => import('./atomic/templates/entity-datatable-skeleton/index.vue')
      )
    )
}
