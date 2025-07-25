import type { ButtonHTMLAttributes } from 'vue'

import type { FlashToastFunctionType, ToastPositionType } from 'atomic'

import type { ToastBreakpointsType, ToastMessageOptions } from 'primevue/toast'

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
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}

export interface UseToastInterface {
  closeToast: () => void
  flashToast: FlashToastFunctionType
}
