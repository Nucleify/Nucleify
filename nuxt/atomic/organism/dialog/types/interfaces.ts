import type { HTMLAttributes, StyleValue } from 'vue'

import type {
  ActionType,
  CloseDialogType,
  ConfirmDialogFunctionType,
  DialogPositionType,
  ElementAppendTo,
  ObjectType,
  OpenDialogFunctionType,
  SelectedObjectType,
  VisibleType,
} from 'atomic'

import type { DialogBreakpoints } from 'primevue/dialog'

export interface DialogInterface {
  header?: string
  footer?: string
  visible: boolean
  modal?: boolean
  contentStyle?: object
  contentClass?: string
  contentProps?: HTMLAttributes
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
  appendTo?: ElementAppendTo
  closeIcon?: string
  maximizeIcon?: string
  minimizeIcon?: string
  closeButtonProps?: object
  maximizeButtonProps?: object
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
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
