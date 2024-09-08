import { Ref } from 'vue'

import { ColorItemColorsInterface } from 'atomic/bosons/types'

export interface ColorPickerInterface {
    item?: string
    modelValue?: string
    panelClass?: string
    format?: 'rgb' | 'hex' | 'hsb'
    defaultColor?: string
    inline?: boolean
    disabled?: boolean
    unstyled?: boolean
    tabindex?: string
    autoZIndex?: boolean
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
