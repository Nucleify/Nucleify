import { PassThrough } from 'primevue/ts-helpers'
import { ProgressBarPassThroughOptions } from 'primevue/progressbar'

import { AdTypeType, ProgressBarModeType } from 'atomic/bosons/types'

export interface ProgressBarInterface {
  adType?: AdTypeType
  value?: number
  mode?: ProgressBarModeType
  showValue?: boolean
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<ProgressBarPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
  width?: string
  height?: string
}
