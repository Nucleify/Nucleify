import type { StyleValue } from 'vue'

import type {
  CloseDialogType,
  ConfirmDialogFunctionType,
  DialogInterface,
  OpenDialogFunctionType,
} from 'atomic'

export interface DmDialogInterface extends DialogInterface {
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

export interface UseDmDialogInterface {
  visibleShow: VisibleType
  visibleCreate: VisibleType
  visibleEdit: VisibleType
  visibleDelete: VisibleType
  selectedObject: SelectedObjectType
  openDialog: OpenDialogFunctionType
  closeDialog: CloseDialogType
}

export interface DmDialogVisibleInterface {
  create: VisibleType
  delete: VisibleType
  edit: VisibleType
  show: VisibleType
}
