import { PassThrough } from 'primevue/ts-helpers'
import { SliderPassThroughOptions } from 'primevue/slider'

import { AdTypeType, ElementDirectionType } from 'atomic/bosons/types'

export interface SliderInterface {
  adType?: AdTypeType
  modelValue?: number | number[]
  defaultValue?: number | number[]
  min?: number
  max?: number
  orientation?: ElementDirectionType
  step?: number
  range?: boolean
  invalid?: boolean
  disabled?: boolean
  tabindex?: number
  ariaLabelledby?: string
  ariaLabel?: string
  formControl?: Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<SliderPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}
