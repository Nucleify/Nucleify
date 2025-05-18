import { LoadingType } from 'atomic'

export interface SkeletonInterface {
  shape?: 'circle' | 'rectangle'
  size?: string
  width?: string
  height?: string
  borderRadius?: string
  animation?: 'none' | 'wave'
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  unstyled?: boolean
  loading?: LoadingType
}
