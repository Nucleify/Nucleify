import { LoadingType } from 'atomic/bosons/types'

export interface SkeletonInterface {
    loading?: LoadingType
    shape?: 'circle' | 'rectangle'
    size?: string
    width?: string
    height?: string
    borderRadius?: string
    animation?: 'none' | 'wave'
    unstyled?: boolean
}
