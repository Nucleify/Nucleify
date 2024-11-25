import { PassThrough } from 'primevue/ts-helpers'
import { PopoverBreakpoints, PopoverPassThroughOptions } from 'primevue/popover'
import { PassThroughOptions } from 'primevue/passthrough'

import { ElementAppendTo } from 'atomic/bosons/types'

export interface PopoverInterface {
  dismissable?: boolean
  showCloseIcon?: boolean
  appendTo?: ElementAppendTo
  baseZIndex?: number
  autoZIndex?: boolean
  breakpoints?: PopoverBreakpoints
  pt?: PassThrough<PopoverPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
  closeOnEscape?: boolean
  src?: string
  buttonClass?: string
  buttonStyle?: string | object
  popoverClass?: string
  icon?: string
}
