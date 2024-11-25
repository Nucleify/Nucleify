import { PassThrough } from 'primevue/ts-helpers'
import { TagPassThroughOptions } from 'primevue/tag'
import { PassThroughOptions } from 'primevue/passthrough'

import { ButtonBadgeSeverityType } from 'atomic/bosons/types'

export interface TagInterface {
  value?: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
  severity?: ButtonBadgeSeverityType
  rounded?: boolean
  pt?: PassThrough<TagPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
}
