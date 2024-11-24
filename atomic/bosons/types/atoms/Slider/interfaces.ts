import { PassThrough } from 'primevue/ts-helpers'
import { SliderPassThroughOptions } from 'primevue/slider'
import { PassThroughOptions } from 'primevue/passthrough'

import { AdTypeType, ElementDirectionType } from 'atomic/bosons/types'

export interface SliderInterface {
  adType?: AdTypeType
  modelValue?: number | number[]
  min?: number
  max?: number
  orientation?: ElementDirectionType
  step?: number
  range?: boolean
  disabled?: boolean
  tabindex?: number
  ariaLabelledby?: string
  ariaLabel?: string
  pt?: PassThrough<SliderPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
}
