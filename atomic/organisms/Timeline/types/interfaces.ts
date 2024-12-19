import { ElementDirectionType } from 'atomic'

export interface TimelineInterface {
  events?: TimelineEventInterface[]
  value?: any[] // eslint-disable-line
  align?: 'left' | 'right' | 'top' | 'bottom' | 'alternate'
  layout?: ElementDirectionType
  dataKey?: string
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
}

export interface TimelineEventInterface {
  status?: string
  date?: string
  icon?: string
  color?: string
}
