import type { NucEntityChartInterface } from '../../entity-chart/types/interfaces'

export interface NucEntityChartCardInterface extends NucEntityChartInterface {
  loading?: boolean
  chartClass?: string
  entity: string
}
