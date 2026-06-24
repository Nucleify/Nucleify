import type { Toast, ToastProps } from 'primereact/toast'
import type { ReactNode, RefObject } from 'react'

import type { FlashToastFunctionType } from './variables'

export interface ToastInterface extends ToastProps {}

export interface AdToastProps extends ToastInterface {
  children?: ReactNode
}

export interface UseToastInterface {
  toastRef: RefObject<Toast | null>
  closeToast: () => void
  flashToast: FlashToastFunctionType
}
