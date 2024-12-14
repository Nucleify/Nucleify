import { PassThrough } from 'primevue/ts-helpers'
import { TimelinePassThroughOptions } from 'primevue'

import { ElementDirectionType } from 'atomic'

export interface TimelineInterface {
  events?: TimelineEventInterface[]
  value?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  align?: 'left' | 'right' | 'top' | 'bottom' | 'alternate'
  layout?: ElementDirectionType
  dataKey?: string
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<TimelinePassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}

export interface TimelineEventInterface {
  status?: string
  date?: string
  icon?: string
  color?: string
}
