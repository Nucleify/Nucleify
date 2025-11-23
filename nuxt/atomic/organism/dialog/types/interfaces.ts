import type { DialogProps } from 'primevue'
import type { StyleValue } from 'vue'

import type {
  CloseDialogType,
  ConfirmDialogFunctionType,
  OpenDialogFunctionType,
} from 'atomic'

export interface DialogInterface extends DialogProps {
  entity?: ObjectType
  action?: ActionType
  title?: string
  fields?: Array<{
    name: string
    label: string
    type: string
    key: string
    props?: Record<string, unknown>
  }>
  selectedObject?: ObjectType
  data?: ObjectType[]
  getData?: () => void
  confirmButtonLabel?: string
  confirm?: ConfirmDialogFunctionType
  cancelButtonLabel?: string
  close?: CloseDialogType
  style?: StyleValue
}

export interface UseDialogInterface {
  visibleShow: VisibleType
  visibleCreate: VisibleType
  visibleEdit: VisibleType
  visibleDelete: VisibleType
  selectedObject: SelectedObjectType
  openDialog: OpenDialogFunctionType
  closeDialog: CloseDialogType
}
export interface DialogVisibleInterface {
  create: VisibleType
  delete: VisibleType
  edit: VisibleType
  show: VisibleType
}
