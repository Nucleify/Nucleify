import type { ButtonBadgeSeverityType } from 'atomic'

export interface TagInterface {
  value?: unknown[]
  severity?: ButtonBadgeSeverityType
  rounded?: boolean
  icon?: string
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}
