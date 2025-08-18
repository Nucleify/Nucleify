import type { DMEntityChartInterface, LoadingRefType } from 'atomic'

export interface DMEntityChartCardInterface extends DMEntityChartInterface {
  loading: LoadingRefType | boolean
  entity: string
}
