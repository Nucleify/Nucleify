import type { App } from 'vue'

import {
  DMEntityDataTable,
  DMEntityDataTableCard,
  DMEntityDataTableSkeleton,
} from '.'

export function registerDMDataTable(app: App<Element>): void {
  app
    .component('dm-entity-datatable', DMEntityDataTable)
    .component('dm-entity-datatable-card', DMEntityDataTableCard)
    .component('dm-entity-datatable-skeleton', DMEntityDataTableSkeleton)
}
