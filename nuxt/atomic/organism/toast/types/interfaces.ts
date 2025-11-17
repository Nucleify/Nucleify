import type { ToastProps } from 'primevue'

import type { FlashToastFunctionType } from 'atomic'

export interface ToastInterface extends ToastProps {}

export interface UseToastInterface {
  closeToast: () => void
  flashToast: FlashToastFunctionType
}
