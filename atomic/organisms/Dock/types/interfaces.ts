import { MenuItem } from 'primevue/menuitem'
import { DockTooltipOptions } from 'primevue'

import { PositionType } from 'atomic'

export interface DockInterface {
  modelValue?: MenuItem[]
  position?: PositionType
  breakpoint?: string
  tooltipOptions?: DockTooltipOptions
  menuId?: string
  tabindex?: string | number
  ariaLabelledby?: string
  ariaLabel?: string
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
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
