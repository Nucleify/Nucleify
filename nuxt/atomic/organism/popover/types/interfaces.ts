import type { ElementAppendTo } from 'atomic'

import type { PopoverBreakpoints } from 'primevue/popover'

export interface PopoverInterface {
  dismissable?: boolean
  appendTo?: ElementAppendTo
  baseZIndex?: number
  autoZIndex?: boolean
  breakpoints?: PopoverBreakpoints
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
  closeOnEscape?: boolean
  src?: string
  buttonClass?: string
  buttonStyle?: string | object
  popoverClass?: string
  icon?: string
}
