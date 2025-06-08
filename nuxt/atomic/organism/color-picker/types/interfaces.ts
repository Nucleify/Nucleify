import type { Ref } from 'vue'

import type { AdTypeType, ColorType, ElementAppendTo } from 'atomic'

export interface ColorPickerInterface {
  adType?: AdTypeType
  modelValue?: string
  defaultColor?: string
  defaultValue?: unknown
  name?: string
  inline?: boolean
  format?: ColorType
  invalid?: boolean
  disabled?: boolean
  tabindex?: string
  autoZIndex?: boolean
  baseZIndex?: number
  inputId?: string
  overlayClass?: string
  appendTo?: ElementAppendTo
  formControl?: Record<string, unknown>
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}

export interface UseColorPickerInterface {
  itemColor: Ref<string | undefined>
  setColorValues: () => void
}
