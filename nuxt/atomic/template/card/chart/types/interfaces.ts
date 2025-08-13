import type { ChartInterface, LoadingRefType } from 'atomic'

export interface CardChartInterface extends ChartInterface {
  loading: LoadingRefType | boolean
  entity: string
}
