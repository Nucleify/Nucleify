import { DataTable } from 'primereact/datatable'
import type { ComponentProps } from 'react'

import type { LoadingType, OpenDialogFunctionType } from 'nucleify'

export interface DataTableInterface
  extends Omit<ComponentProps<typeof DataTable>, 'className'> {
  adType: ObjectNameType
  className?: string
  loading?: LoadingType
  actions?: ActionInterface
  openDialog?: OpenDialogFunctionType
  selectedObject?: ObjectType
}

export interface ColumnInterface {
  field?: string
  header?: string
  class?: string
  sortable?: boolean
}
