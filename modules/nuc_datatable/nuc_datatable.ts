import type { App } from 'vue'

import {
  NucEntityDataTable,
  NucEntityDataTableCard,
  NucEntityDataTableSkeleton,
} from '.'

export function registerNucDataTable(app: App<Element>): void {
  app
    .component('nuc-entity-datatable', NucEntityDataTable)
    .component('nuc-entity-datatable-card', NucEntityDataTableCard)
    .component('nuc-entity-datatable-skeleton', NucEntityDataTableSkeleton)
}
