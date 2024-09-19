import { HintedString, PassThrough } from 'primevue/ts-helpers'
import {
    OverlayPanelBreakpoints,
    OverlayPanelPassThroughOptions,
} from 'primevue/overlaypanel'
import { PassThroughOptions } from 'primevue/passthrough'

export interface OverlayPanelInterface {
    ref?: string
    dismissable?: boolean
    showCloseIcon?: boolean
    appendTo?: HTMLElement | HintedString<'body' | 'self'>
    baseZIndex?: number
    autoZIndex?: boolean
    breakpoints?: OverlayPanelBreakpoints
    pt?: PassThrough<OverlayPanelPassThroughOptions>
    ptOptions?: PassThroughOptions
    unstyled?: boolean
    closeOnEscape?: boolean
    src?: string
    buttonClass?: string
    buttonStyle?: string | object
    overlayPanelClass?: string
}
