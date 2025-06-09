import type { ButtonBadgeSeverityType, ElementSizeType } from 'atomic'

export interface BadgeInterface {
  value?: string | number
  severity?: ButtonBadgeSeverityType
  size?: ElementSizeType | 'xlarge'
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}
