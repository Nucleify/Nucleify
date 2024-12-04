import { PassThrough } from 'primevue/ts-helpers'
import { MenuItem } from 'primevue/menuitem'
import { ElementDirectionType } from 'atomic/bosons/types'
import { MegaMenuPassThroughOptions } from 'primevue'

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
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<MegaMenuPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
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
