import { PassThrough } from 'primevue/ts-helpers'
import { DividerPassThroughOptions } from 'primevue/divider'
import { PassThroughOptions } from 'primevue/passthrough'

import { ElementDirectionType, PositionType } from 'atomic/bosons/types'

export interface DividerInterface {
  align?: PositionType | 'center'
  layout?: ElementDirectionType
  type?: 'dashed' | 'dotted' | 'solid'
  pt?: PassThrough<DividerPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
}
