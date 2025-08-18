import type { DMEntityChartInterface, LoadingRefType } from 'atomic'

export interface CardChartInterface extends DMEntityChartInterface {
  loading: LoadingRefType | boolean
  entity: string
}
