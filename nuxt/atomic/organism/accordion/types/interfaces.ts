import { AccordionProps } from 'primevue'

export interface AccordionInterface extends AccordionProps {
  panels?: AccordionPanelInterface[]
  hexagons?: boolean
}

export interface AccordionPanelInterface {
  index: number
  content: string
  answer: string
}
