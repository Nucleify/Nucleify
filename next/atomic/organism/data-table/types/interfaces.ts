import { DataTable } from 'primereact/datatable'
import type { ComponentProps } from 'react'

type LoadingType = boolean | undefined

type OpenDialogFunctionType = (action: ActionType, object?: ObjectType) => void

type SelectedObjectType = ObjectType | undefined

export interface DataTableInterface
  extends Omit<ComponentProps<typeof DataTable>, 'className'> {
  adType: ObjectNameType
  className?: string
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
