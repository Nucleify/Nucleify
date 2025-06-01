import type { LoadingType } from 'atomic'

export interface SkeletonInterface {
  shape?: 'circle' | 'rectangle'
  size?: string
  width?: string
  height?: string
  borderRadius?: string
  animation?: 'none' | 'wave'
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
  loading?: LoadingType
}
