import type { AdTypeType, ProgressBarModeType } from 'atomic'

export interface ProgressBarInterface {
  adType?: AdTypeType
  value?: number
  mode?: ProgressBarModeType
  showValue?: boolean
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
  width?: string
  height?: string
}
