import type { AdTypeType } from 'atomic'

export interface ProgressSpinnerInterface {
  adType?: AdTypeType
  strokeWidth?: string
  fill?: string
  animationDuration?: string
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
  width?: string
  height?: string
}
