import type { DataTableProps } from 'primevue'

import type { OpenDialogFunctionType } from 'nucleify'

export interface DataTableInterface extends DataTableProps {
  nuiType: ObjectNameType
  actions?: ActionInterface
  openDialog?: OpenDialogFunctionType
  selectedObject?: SelectedObjectType
}

export interface ColumnInterface {
  field?: string
  header?: string
  class?: string
}
