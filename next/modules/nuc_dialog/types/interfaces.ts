import type { CSSProperties } from 'react'

import type { DialogInterface } from '../../../atomic/organism/dialog/types/interfaces'
import type {
  CloseDialogType,
  ConfirmDialogFunctionType,
  OpenDialogFunctionType,
} from './functions'

export interface NucDialogInterface extends DialogInterface {
  entity?: AdTypeType
  action?: ActionType | 'share'
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
  confirmButtonDisabled?: boolean
  confirm?: ConfirmDialogFunctionType
  cancelButtonLabel?: string
  close?: CloseDialogType
  style?: CSSProperties
}

export type VisibleType = boolean
export type SelectedObjectType = ObjectType | null

export interface UseNucDialogInterface {
  visibleShow: VisibleType
  visibleCreate: VisibleType
  visibleEdit: VisibleType
  visibleDelete: VisibleType
  selectedObject: SelectedObjectType
  openDialog: OpenDialogFunctionType
  closeDialog: CloseDialogType
}

export interface NucDialogVisibleInterface {
  create: VisibleType
  delete: VisibleType
  edit: VisibleType
  show: VisibleType
}
