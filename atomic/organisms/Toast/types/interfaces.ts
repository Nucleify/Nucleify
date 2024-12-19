import { ButtonHTMLAttributes } from 'vue'
import { ToastBreakpointsType, ToastMessageOptions } from 'primevue/toast'

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
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
}

export interface UseToastInterface {
  closeToast: () => void
  flashToast: FlashToastFunctionType
}
