import { SkeletonPassThroughOptions } from 'primevue/skeleton'
import { PassThroughOptions } from 'primevue/passthrough'

import { LoadingType } from 'atomic/bosons/types'

export interface SkeletonInterface {
  shape?: 'circle' | 'rectangle'
  size?: string
  width?: string
  height?: string
  borderRadius?: string
  animation?: 'none' | 'wave'
  unstyled?: boolean
  pt?: PassThroughOptions<SkeletonPassThroughOptions>
  ptOptions?: PassThroughOptions
  loading?: LoadingType
}
