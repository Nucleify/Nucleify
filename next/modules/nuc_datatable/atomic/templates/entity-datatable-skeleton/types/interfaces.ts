import type { ColumnInterface } from '../../../../../../atomic/organism/data-table/types/interfaces'

type LoadingType = boolean | undefined

export interface NucSkeletonDataTableInterface {
  rows: unknown[]
  enableShare?: boolean
  loading: LoadingType
  specificColumns: ColumnInterface[]
}
