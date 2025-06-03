export interface AccordionInterface {
  panels?: AccordionPanelInterface[]
  value?: number
  multiple?: boolean
  lazy?: boolean
  expandIcon?: string
  collapseIcon?: string
  tabindex?: number
  selectOnFocus?: boolean
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
  hexagons?: boolean
}

export interface AccordionPanelInterface {
  index: number
  content: string
  answer: string
}
