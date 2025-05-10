import { MeterItem } from 'primevue'

import { ElementDirectionType } from 'atomic'

export interface MeterGroupInterface {
  value?: MeterItem[] | MeterGroupValueInterface[]
  min?: number
  max?: number
  orientation?: ElementDirectionType
  labelPosition?: 'start' | 'end'
  labelOrientation?: ElementDirectionType
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
}

export interface MeterGroupValueInterface {
  label?: string
  color?: string
  value?: number
}
