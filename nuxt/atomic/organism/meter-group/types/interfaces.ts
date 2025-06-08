import type { MeterItem } from 'primevue'

import type { ElementDirectionType } from 'atomic'

export interface MeterGroupInterface {
  value?: MeterItem[]
  min?: number
  max?: number
  orientation?: ElementDirectionType
  labelPosition?: 'start' | 'end'
  labelOrientation?: ElementDirectionType
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}
