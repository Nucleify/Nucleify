import { ChartInterface, LoadingRefType } from 'atomic/bosons/types'

export interface CardChartInterface extends ChartInterface {
    loading: LoadingRefType | boolean
}
