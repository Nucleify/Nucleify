import type { ColumnInterface, LoadingType } from 'atomic'

export interface SkeletonDataTableInterface {
  rows: []
  loading: LoadingType
  specificColumns: ColumnInterface[]
}
