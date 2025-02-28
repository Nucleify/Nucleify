export interface AccordionInterface {
  panels?: AccordionPanelInterface[]
  value?: number
  multiple?: boolean
  lazy?: boolean
  expandIcon?: string
  collapseIcon?: string
  tabindex?: number
  selectOnFocus?: boolean
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
}
export interface AccordionPanelInterface {
  index: number
  content: string
  answer: string
}
