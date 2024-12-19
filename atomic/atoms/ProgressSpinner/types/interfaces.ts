import { AdTypeType } from 'atomic'

export interface ProgressSpinnerInterface {
  adType?: AdTypeType
  strokeWidth?: string
  fill?: string
  animationDuration?: string
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
  width?: string
  height?: string
}
