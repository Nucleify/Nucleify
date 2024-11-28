import { PassThrough } from 'primevue/ts-helpers'
import { DividerPassThroughOptions } from 'primevue/divider'

import { ElementDirectionType, PositionType } from 'atomic/bosons/types'

export interface DividerInterface {
  align?: PositionType | 'center'
  layout?: ElementDirectionType
  type?: 'solid' | 'dashed' | 'dotted'
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<DividerPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}
