import { ProgressBarPassThroughOptions } from 'primevue/progressbar'
import { PassThroughOptions } from 'primevue/passthrough'

export interface ProgressSpinnerInterface {
  strokeWidth?: string
  fill?: string
  animationDuration?: string
  pt?: PassThroughOptions<ProgressBarPassThroughOptions>
  ptOption?: PassThroughOptions
  unstyled?: boolean
  width?: string
  height?: string
}
