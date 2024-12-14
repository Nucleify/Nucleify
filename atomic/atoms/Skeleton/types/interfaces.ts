import { PassThrough } from 'primevue/ts-helpers'
import { SkeletonPassThroughOptions } from 'primevue/skeleton'

import { LoadingType } from 'atomic'

export interface SkeletonInterface {
  shape?: 'circle' | 'rectangle'
  size?: string
  width?: string
  height?: string
  borderRadius?: string
  animation?: 'none' | 'wave'
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<SkeletonPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  unstyled?: boolean
  loading?: LoadingType
}
