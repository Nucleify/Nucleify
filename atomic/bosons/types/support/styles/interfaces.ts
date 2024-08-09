export interface ColorItemStyleInterface {
    color?: string | null
    backgroundColor?: string | null
    borderColor?: string | null
    boxShadow?: string | null
    opacity?: number | null
}
export interface ColorItemColorsInterface {
    primary: string | null
    hover: string | null
    sidebarSelected?: string | null
}

export interface HandleStylesInterface {
    mainStyle: ColorItemStyleInterface
    activityStyle: ColorItemStyleInterface
    articleStyle: ColorItemStyleInterface
    contactStyle: ColorItemStyleInterface
    userStyle: ColorItemStyleInterface
    mainItemStyle: ColorItemStyleInterface
    activityItemStyle: ColorItemStyleInterface
    articleItemStyle: ColorItemStyleInterface
    contactItemStyle: ColorItemStyleInterface
    userItemStyle: ColorItemStyleInterface
}
