import { MenuItem } from 'primevue/menuitem'

import { ElementDirectionType } from 'atomic'

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
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
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
