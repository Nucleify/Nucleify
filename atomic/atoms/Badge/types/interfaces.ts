import { PassThrough } from 'primevue/ts-helpers'
import { BadgePassThroughOptions } from 'primevue/badge'
import { PassThroughOptions } from 'primevue/passthrough'

import { ButtonBadgeSeverityType, ElementSizeType } from 'atomic'

export interface BadgeInterface {
  value?: string | number
  severity?: ButtonBadgeSeverityType
  size?: ElementSizeType | 'xlarge'
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<BadgePassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
}
