import type { MenuItem } from 'primevue/menuitem'
import type { DockTooltipOptions } from 'primevue'

import type { PositionType } from 'atomic'

export interface DockInterface {
  modelValue?: MenuItem[]
  position?: PositionType
  breakpoint?: string
  tooltipOptions?: DockTooltipOptions
  menuId?: string
  tabindex?: string | number
  ariaLabelledby?: string
  ariaLabel?: string
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}
export interface DockItemInterface {
  icon?: string
  label?: string
  url?: string
  class?: string
  adType?: string
  click?: () => void
  logo?: boolean
}
