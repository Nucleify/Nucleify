import type { TimelineProps } from 'primevue'

export interface TimelineInterface extends TimelineProps {}

export interface TimelineEventInterface {
  status?: string
  date?: string
  icon?: string
  color?: string
}
