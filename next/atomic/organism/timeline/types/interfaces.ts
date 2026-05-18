import type { TimelineProps } from 'primereact/timeline'
import type { ReactNode } from 'react'

export interface TimelineInterface extends TimelineProps {}

export interface TimelineEventInterface {
  status?: string
  date?: string
  icon?: string
  color?: string
}

export interface AdTimelineProps extends TimelineInterface {
  events?: TimelineEventInterface[]
  renderEvent?: (event: TimelineEventInterface) => ReactNode
}
