import { ButtonHTMLAttributes } from 'vue'
import {
  ToastBreakpointsType,
  ToastMessageOptions,
  ToastPassThroughOptions,
} from 'primevue/toast'
import { PassThrough } from 'primevue/ts-helpers'

import { FlashToastFunctionType, ToastPositionType } from 'atomic'

export interface ToastInterface {
  group?: string
  position?: ToastPositionType
  autoZIndex?: boolean
  baseZIndex?: number
  breakpoints?: ToastBreakpointsType
  closeIcon?: string
  infoIcon?: string
  warnIcon?: string
  errorIcon?: string
  successIcon?: string
  closeButtonProps?: ButtonHTMLAttributes
  message?: ToastMessageOptions
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<ToastPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}

export interface UseToastInterface {
  closeToast: () => void
  flashToast: FlashToastFunctionType
}
