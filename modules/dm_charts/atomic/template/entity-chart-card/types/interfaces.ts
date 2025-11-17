import type { DMEntityChartInterface, LoadingRefType } from 'atomic'

export interface DMEntityChartCardInterface extends DMEntityChartInterface {
  loading: LoadingRefType | boolean
  chartClass?: string
  entity: string
}
