import { Ref } from 'vue'

export interface ColorItemStyleInterface {
    color?: string | null
    backgroundColor?: string | null
    borderColor?: string | null
    boxShadow?: string | null
}

export interface ColorItemColorsInterface {
    primary: string | null
    hover: string | null
    sidebarSelected?: string | null
}

export interface ColorPickerInterface {
    item: string
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

export interface HandleStylesInterface {
    mainStyle: ColorItemStyleInterface
    activityStyle: ColorItemStyleInterface
    articleStyle: ColorItemStyleInterface
    contactStyle: ColorItemStyleInterface
    userStyle: ColorItemStyleInterface
    mainSidebarItemStyle: ColorItemStyleInterface
    activitySidebarItemStyle: ColorItemStyleInterface
    articleSidebarItemStyle: ColorItemStyleInterface
    contactSidebarItemStyle: ColorItemStyleInterface
    userSidebarItemStyle: ColorItemStyleInterface
}
