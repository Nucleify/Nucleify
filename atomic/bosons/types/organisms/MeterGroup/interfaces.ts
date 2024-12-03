import { PassThrough } from 'primevue/ts-helpers'
import { MeterGroupPassThroughOptions, MeterItem } from 'primevue'
import { ElementDirectionType } from 'atomic/bosons/types'

export interface MeterGroupInterface {
  value?: MeterItem[] | MeterGroupValueInterface[]
  min?: number
  max?: number
  orientation?: ElementDirectionType
  labelPosition?: 'start' | 'end'
  labelOrientation?: ElementDirectionType
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<MeterGroupPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}

export interface MeterGroupValueInterface {
  label?: string
  color?: string
  value?: number
}
