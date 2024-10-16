import { HTMLAttributes, StyleValue } from 'vue'
import { DialogBreakpoints, DialogPassThroughAttributes } from 'primevue/dialog'
import { HintedString, PassThrough } from 'primevue/ts-helpers'
import { PassThroughOptions } from 'primevue/passthrough'

import {
  ActionType,
  CloseDialogFunctionType,
  ConfirmDialogFunctionType,
  DialogPositionType,
  ObjectType,
  OpenDialogFunctionType,
  SelectedObjectType,
  VisibleType,
} from 'atomic/bosons/types'

export interface DialogInterface {
  header?: string
  footer?: string
  visible: boolean
  modal?: boolean
  contentStyle?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  contentClass?: string
  contentProps?: HTMLAttributes
  rtl?: boolean
  closable?: boolean
  dismissableMask?: boolean
  closeOnEscape?: boolean
  showHeader?: boolean
  blockScroll?: boolean
  baseZIndex?: number
  autoZIndex?: boolean
  position?: DialogPositionType
  maximizable?: boolean
  breakpoints?: DialogBreakpoints
  draggable?: boolean
  keepInViewPort?: boolean
  minX?: number
  minY?: number
  appendTo?: HTMLElement | HintedString<'body' | 'self'>
  pt?: PassThrough<DialogPassThroughAttributes>
  ptOptions?: PassThroughOptions
  entity: ObjectType
  action: ActionType
  title?: string
  fields?: Array<{
    name: string
    label: string
    type: string
    key: string
    props?: Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
  }>
  selectedObject?: ObjectType
  data?: ObjectType[]
  getData?: () => void
  confirmButtonLabel?: string
  confirm?: ConfirmDialogFunctionType
  cancelButtonLabel?: string
  close: CloseDialogFunctionType
  style?: StyleValue
}

export interface UseDialogInterface {
  visibleShow: VisibleType
  visibleCreate: VisibleType
  visibleEdit: VisibleType
  visibleDelete: VisibleType
  selectedObject: SelectedObjectType
  openDialog: OpenDialogFunctionType
  closeDialog: CloseDialogFunctionType
}
