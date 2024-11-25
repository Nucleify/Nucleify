import { PassThrough } from 'primevue/ts-helpers'
import {
  OverlayPanelBreakpoints,
  OverlayPanelPassThroughOptions,
} from 'primevue/overlaypanel'
import { PassThroughOptions } from 'primevue/passthrough'

import { ElementAppendTo } from 'atomic/bosons/types'

export interface OverlayPanelInterface {
  dismissable?: boolean
  showCloseIcon?: boolean
  appendTo?: ElementAppendTo
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
  icon?: string
}
