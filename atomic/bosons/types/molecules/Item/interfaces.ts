import { GetItemStylesFunctionType } from './functions'

export interface ItemInterface {
    icon?: string
    url?: string
}

export interface UseItemStylesInterface {
    getItemStyles: GetItemStylesFunctionType
}
