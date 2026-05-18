import type { AccordionProps } from 'primereact/accordion'

export interface AccordionInterface extends AccordionProps {
  panels?: AccordionPanelInterface[]
  hexagons?: boolean
}

export interface AccordionPanelInterface {
  index: number
  content: string
  answer: string
}
