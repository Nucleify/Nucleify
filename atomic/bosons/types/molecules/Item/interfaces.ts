import { GetItemStylesFunctionType } from './functions'

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

export interface ItemInterface {
    icon?: string
    url?: string
}

export interface UseItemStylesInterface {
    getItemStyles: GetItemStylesFunctionType
}
