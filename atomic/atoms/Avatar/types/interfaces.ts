import { PassThrough } from 'primevue/ts-helpers'
import { AvatarPassThroughOptions } from 'primevue/avatar'
import { PassThroughOptions } from 'primevue/passthrough'

import { ElementShapeType } from 'atomic'

export interface AvatarInterface {
  label?: string
  icon?: string
  image?: string
  size?: 'large' | 'xlarge' | 'normal'
  shape?: ElementShapeType
  ariaLabel?: string
  ariaLabelledby?: string
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<AvatarPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
}
