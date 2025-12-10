import type { ColumnInterface, LoadingType } from 'atomic'

export interface NucSkeletonDataTableInterface {
  rows: []
  loading: LoadingType
  specificColumns: ColumnInterface[]
}
