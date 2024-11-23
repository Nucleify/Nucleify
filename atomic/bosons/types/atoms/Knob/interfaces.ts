import { KnobPassThroughOptions } from 'primevue/knob'
import { PassThrough } from 'primevue/ts-helpers'
import { PassThroughOptions } from 'primevue/passthrough'

export interface KnobInterface {
  modelValue?: number
  size?: number
  disabled?: boolean
  readonly?: boolean
  step?: number
  min?: number
  max?: number
  valueColor?: string
  rangeColor?: string
  textColor?: string
  strokeWidth?: number
  showValue?: boolean
  valueTemplate?: void
  tabindex?: number
  ariaLabelledby?: string
  ariaLabel?: string
  pt?: PassThrough<KnobPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
}
