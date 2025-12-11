import type { LoadingRefType, NucEntityChartInterface } from 'atomic'

export interface NucEntityChartCardInterface extends NucEntityChartInterface {
  loading: LoadingRefType | boolean
  chartClass?: string
  entity: string
}
