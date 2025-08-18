import type { CanvasHTMLAttributes } from 'vue'

import type { ChartMethodType, ChartType } from 'atomic'

export interface ChartInterface {
  type: ChartType
  data?: object
  options?: object
  plugins?: object
  width?: number
  height?: number
  canvasProps?: CanvasHTMLAttributes
  dt?: unknown
  pt?: object
  ptOptions?: object
  direction?: string
  chartMethodType: ChartMethodType
  chartClass?: string
}
