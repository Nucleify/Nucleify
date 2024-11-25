import { PassThrough } from 'primevue/ts-helpers'
import { InputMaskPassThroughOptions } from 'primevue/inputmask'
import { PassThroughOptions } from 'primevue/passthrough'

import { AdTypeType, ElementVariantType } from 'atomic/bosons/types'

export interface InputMaskInterface {
  adType?: AdTypeType
  value?: string
  slotChar?: string
  mask?: string
  autoClear?: boolean
  unmask?: boolean
  readonly?: boolean
  invalid?: boolean
  variant?: ElementVariantType
  pt?: PassThrough<InputMaskPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
  disabled?: boolean
}
