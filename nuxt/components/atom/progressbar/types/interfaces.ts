import { AdTypeType, ProgressBarModeType } from 'atomic'

export interface ProgressBarInterface {
  adType?: AdTypeType
  value?: number
  mode?: ProgressBarModeType
  showValue?: boolean
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
  width?: string
  height?: string
}
