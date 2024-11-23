import { PassThrough } from 'primevue/ts-helpers'
import { SliderPassThroughOptions } from 'primevue/slider'
import { PassThroughOptions } from 'primevue/passthrough'

export interface SliderInterface {
  modelValue?: number | number[]
  min?: number
  max?: number
  orientation?: 'horizontal' | 'vertical'
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
