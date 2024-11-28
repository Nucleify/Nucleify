import { PassThrough } from 'primevue/ts-helpers'
import { AccordionPassThroughOptions } from 'primevue'

export interface AccordionInterface {
  value?: AccordionPanelInterface | AccordionPanelInterface[]
  multiple?: boolean
  lazy?: boolean
  expandIcon?: string
  collapseIcon?: string
  tabindex?: number
  selectOnFocus?: boolean
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<AccordionPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}
export interface AccordionPanelInterface {
  value?: number
  header?: string
  content?: string
  panel?: any // eslint-disable-line @typescript-eslint/no-explicit-any
}
