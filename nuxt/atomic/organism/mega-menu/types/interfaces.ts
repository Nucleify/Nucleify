import type { ElementDirectionType } from 'atomic'

import type { MenuItem } from 'primevue/menuitem'

export interface MegaMenuInterface {
  items?: MegaMenuValuesInterface[]
  model?: MenuItem[][]
  orientation?: ElementDirectionType
  breakpoint?: string
  disabled?: boolean
  tabindex?: string | number
  scrollHeight?: string
  ariaLabel?: string
  ariaLabelledby?: string
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}
export interface MegaMenuValuesInterface {
  label?: string
  icon?: string
  items?: MegaMenuSubItemInterface[][]
}
export interface MegaMenuSubItemInterface {
  label?: string
  items?: string[]
}
