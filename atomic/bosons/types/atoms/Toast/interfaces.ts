import {
    ToastBreakpointsType,
    ToastMessageOptions,
    ToastPassThroughOptions,
} from 'primevue/toast'
import { FlashToastFunctionType, ToastPositionType } from 'atomic/bosons/types'
import { PassThrough } from 'primevue/ts-helpers'
import { PassThroughOptions } from 'primevue/passthrough'

export interface ToastInterface {
    group?: string
    position?: ToastPositionType
    autoZIndex?: boolean
    baseZIndex?: number
    breakpoints?: ToastBreakpointsType
    icon?: string
    message?: ToastMessageOptions
    unstyled?: boolean
    pt?: PassThrough<ToastPassThroughOptions>
    ptOptions?: PassThroughOptions
}

export interface UseToastInterface {
    closeToast: () => void
    flashToast: FlashToastFunctionType
}
