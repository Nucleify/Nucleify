import type { ElementDirectionType } from 'atomic'

export interface TimelineInterface {
  events?: TimelineEventInterface[]
  value?: unknown[]
  align?: 'left' | 'right' | 'top' | 'bottom' | 'alternate'
  layout?: ElementDirectionType
  dataKey?: string
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}

export interface TimelineEventInterface {
  status?: string
  date?: string
  icon?: string
  color?: string
}
