import { Ref } from 'vue'

import { AdTypeType, ColorType, ElementAppendTo } from 'atomic'

export interface ColorPickerInterface {
  adType?: AdTypeType
  modelValue?: string
  defaultColor?: string
  defaultValue?: any // eslint-disable-line
  name?: string
  inline?: boolean
  format?: ColorType
  invalid?: boolean
  disabled?: boolean
  tabindex?: string
  autoZIndex?: boolean
  baseZIndex?: number
  inputId?: string
  overlayClass?: any // eslint-disable-line
  appendTo?: ElementAppendTo
  formControl?: Record<string, any> // eslint-disable-line
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
}

export interface UseColorPickerInterface {
  itemColor: Ref<string | undefined>
  setColorValues: () => void
}
