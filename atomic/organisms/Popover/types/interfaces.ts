import { PopoverBreakpoints } from 'primevue/popover'

import { ElementAppendTo } from 'atomic'

export interface PopoverInterface {
  dismissable?: boolean
  appendTo?: ElementAppendTo
  baseZIndex?: number
  autoZIndex?: boolean
  breakpoints?: PopoverBreakpoints
  dt?: any //eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: any // eslint-disable-line
  ptOptions?: any //eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
  closeOnEscape?: boolean
  src?: string
  buttonClass?: string
  buttonStyle?: string | object
  popoverClass?: string
  icon?: string
}
