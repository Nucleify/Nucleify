import { ChartProps } from 'primevue/chart'

export interface ChartInterface extends ChartProps {
  width?: number
  height?: number
  chartClass?: string
}
