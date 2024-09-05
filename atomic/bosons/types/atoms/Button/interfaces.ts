import {
    LoadingType,
    ObjectNameType,
    SkeletonInterface,
} from 'atomic/bosons/types'

export interface ButtonInterface {
    onclick?: (event: MouseEvent) => void
    severity?:
        | string
        | 'primary'
        | 'secondary'
        | 'success'
        | 'info'
        | 'warning'
        | 'help'
        | 'danger'
    disabled?: boolean
    raised?: boolean
    rounded?: boolean
    text?: boolean
    type?: ObjectNameType
    outlined?: boolean
    icon?: string
    label?: string
    loading?: LoadingType
    width?: string
    height?: string
    gap?: string
    padding?: string
}
