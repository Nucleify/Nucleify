import { PassThrough } from 'primevue/ts-helpers'
import { AvatarPassThroughOptions } from 'primevue/avatar'
import { PassThroughOptions } from 'primevue/passthrough'

import { ElementShapeType, ElementSizeType } from 'atomic/bosons/types'

export interface AvatarInterface {
  label?: string
  icon?: string
  image?: string
  size?: ElementSizeType | 'xlarge'
  shape?: ElementShapeType
  ariaLabel?: string
  ariaLabelledby?: string
  pt?: PassThrough<AvatarPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
}
