import { ToastBreakpointsType, ToastMessageOptions } from 'primevue/toast'
import { FlashToastFunctionType, ToastPositionType } from 'atomic/bosons/types'

export interface ToastInterface {
    group?: string
    position?: ToastPositionType
    autoZIndex?: boolean
    baseZIndex?: number
    breakpoints?: ToastBreakpointsType
    icon?: string
    message?: ToastMessageOptions
    unstyled?: boolean
}

export interface UseToastInterface {
    closeToast: () => void
    flashToast: FlashToastFunctionType
}
