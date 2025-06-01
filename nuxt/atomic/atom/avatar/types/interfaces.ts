import type { ElementShapeType } from 'atomic'

export interface AvatarInterface {
  label?: string
  icon?: string
  image?: string
  size?: 'large' | 'xlarge' | 'normal'
  shape?: ElementShapeType
  ariaLabel?: string
  ariaLabelledby?: string
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}
