import { PassThrough } from 'primevue/ts-helpers'
import { ProgressBarPassThroughOptions } from 'primevue/progressbar'
import { PassThroughOptions } from 'primevue/passthrough'

import { AdTypeType, ProgressBarModeType } from 'atomic/bosons/types'

export interface ProgressBarInterface {
  adType?: AdTypeType
  value?: number
  mode?: ProgressBarModeType
  showValue?: boolean
  pt?: PassThrough<ProgressBarPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
  width?: string
  height?: string
}
