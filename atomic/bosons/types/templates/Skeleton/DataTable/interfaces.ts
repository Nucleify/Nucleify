import { ColumnInterface, LoadingType } from 'atomic/bosons/types'

export interface SkeletonDataTableInterface {
  rows: []
  loading: LoadingType
  specificColumns: ColumnInterface[]
}
