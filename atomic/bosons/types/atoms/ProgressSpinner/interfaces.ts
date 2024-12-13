import { PassThrough } from 'primevue/ts-helpers'
import { ProgressBarPassThroughOptions } from 'primevue/progressbar'

import { AdTypeType } from 'atomic/bosons/types'

export interface ProgressSpinnerInterface {
  adType?: AdTypeType
  strokeWidth?: string
  fill?: string
  animationDuration?: string
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<ProgressBarPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
  width?: string
  height?: string
}
