import { PassThrough } from 'primevue/ts-helpers'
import { ProgressBarPassThroughOptions } from 'primevue/progressbar'
import { PassThroughOptions } from 'primevue/passthrough'

import { AdTypeType } from 'atomic/bosons/types'

export interface ProgressSpinnerInterface {
  adType?: AdTypeType
  strokeWidth?: string
  fill?: string
  animationDuration?: string
  pt?: PassThrough<ProgressBarPassThroughOptions>
  ptOption?: PassThroughOptions
  unstyled?: boolean
  width?: string
  height?: string
}
