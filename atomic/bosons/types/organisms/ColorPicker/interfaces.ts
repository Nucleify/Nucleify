import { Ref } from 'vue'
import { PassThrough } from 'primevue/ts-helpers'
import { ColorPickerPassThroughOptions } from 'primevue/colorpicker'

import {
  AdTypeType,
  ColorItemColorsInterface,
  ColorType,
  ElementAppendTo,
} from 'atomic/bosons/types'

export interface ColorPickerInterface {
  adType?: AdTypeType
  modelValue?: string
  defaultColor?: string
  defaultValue?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  name?: string
  inline?: boolean
  format?: ColorType
  invalid?: boolean
  disabled?: boolean
  tabindex?: string
  autoZIndex?: boolean
  baseZIndex?: number
  inputId?: string
  overlayClass?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  appendTo?: ElementAppendTo
  formControl?: Record<string, any> // eslint-disable-line @typescript-eslint/no-explicit-any
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<ColorPickerPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
}

export interface UseColorsReturnInterface {
  mainItemColors: ColorItemColorsInterface
  activityItemColors: ColorItemColorsInterface
  articleItemColors: ColorItemColorsInterface
  contactItemColors: ColorItemColorsInterface
  moneyItemColors: ColorItemColorsInterface
  userItemColors: ColorItemColorsInterface
}

export interface UseColorPickerInterface {
  itemColor: Ref<string | undefined>
  setColorValues: () => void
}

export interface UseColorsInterface {
  mainItemColors: ColorItemColorsInterface
  activityItemColors: ColorItemColorsInterface
  articleItemColors: ColorItemColorsInterface
  contactItemColors: ColorItemColorsInterface
  moneyItemColors: ColorItemColorsInterface
  userItemColors: ColorItemColorsInterface
  setDefaultColors: (initial: boolean) => void
}
