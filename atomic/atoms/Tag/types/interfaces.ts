import { PassThrough } from 'primevue/ts-helpers'
import { TagPassThroughOptions } from 'primevue/tag'

import { ButtonBadgeSeverityType } from 'atomic'

export interface TagInterface {
  value?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  severity?: ButtonBadgeSeverityType
  rounded?: boolean
  icon?: string
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<TagPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}
