import type { DataTableProps } from 'primevue'

import type { LoadingType, OpenDialogFunctionType } from 'atomic'

export interface DataTableInterface extends DataTableProps {
  adType: ObjectNameType
  loading?: LoadingType
  actions?: ActionInterface
  openDialog?: OpenDialogFunctionType
  selectedObject?: SelectedObjectType
}

export interface ColumnInterface {
  field?: string
  header?: string
  class?: string
  sortable?: boolean
}
