import { ButtonBadgeSeverityType, ElementSizeType } from 'atomic'

export interface BadgeInterface {
  value?: string | number
  severity?: ButtonBadgeSeverityType
  size?: ElementSizeType | 'xlarge'
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
}
