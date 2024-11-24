import { Ref } from 'vue'
import { PassThrough } from 'primevue/ts-helpers'
import { ColorPickerPassThroughOptions } from 'primevue/colorpicker'
import { PassThroughOptions } from 'primevue/passthrough'

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
  inline?: boolean
  format?: ColorType
  disabled?: boolean
  tabindex?: string
  autoZIndex?: boolean
  panelClass?: string
  appendTo?: ElementAppendTo
  pt?: PassThrough<ColorPickerPassThroughOptions>
  ptOptions?: PassThroughOptions
  unstyled?: boolean
}

export interface UseColorsReturnInterface {
  mainItemColors: ColorItemColorsInterface
  activityItemColors: ColorItemColorsInterface
  articleItemColors: ColorItemColorsInterface
  contactItemColors: ColorItemColorsInterface
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
  userItemColors: ColorItemColorsInterface
  setDefaultColors: (initial: boolean) => void
}
