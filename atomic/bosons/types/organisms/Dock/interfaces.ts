import { PassThrough } from 'primevue/ts-helpers'
import { PositionType } from 'atomic/bosons/types'

import { MenuItem } from 'primevue/menuitem'
import { DockPassThroughOptions, DockTooltipOptions } from 'primevue'

export interface DockInterface {
  modelValue?: MenuItem[]
  position?: PositionType
  breakpoint?: string
  tooltipOptions?: DockTooltipOptions
  menuId?: string
  tabindex?: string | number
  ariaLabelledby?: string
  ariaLabel?: string
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<DockPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}
export interface DockItemInterface {
  icon?: string
  label?: string
  url?: string
  class?: string
  click?: () => void
  logo?: boolean
}
