import { CanvasHTMLAttributes } from 'vue'
import { PassThrough } from 'primevue/ts-helpers'
import { ChartPassThroughOptions } from 'primevue/chart'

import {
  ActivityLogInterface,
  ArticleInterface,
  ContactInterface,
  ChartType,
  ChartMethodType,
  MoneyInterface,
  UserInterface,
} from 'atomic'

export interface ChartInterface {
  type: ChartType
  data?: object
  options?: object
  plugins?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  width?: number
  height?: number
  canvasProps?: CanvasHTMLAttributes
  dt?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  pt?: PassThrough<ChartPassThroughOptions>
  ptOptions?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  direction?: string
  chartMethodType: ChartMethodType
  activityLogData?: ActivityLogInterface[]
  articleData?: ArticleInterface[]
  contactData?: ContactInterface[]
  moneyData?: MoneyInterface[]
  userData?: UserInterface[]
  chartClass?: string
  example?: boolean
}

export interface DisplayChartsInterface {
  [key: string]: boolean
  Activity: boolean
  Admin: boolean
  Article: boolean
  Contact: boolean
  Money: boolean
}

export interface UseDisplayChartsInterface {
  display: DisplayChartsInterface
  displayChartsToggle: (action: string) => void
  setDefaultChartsDisplay: (initial?: boolean, reload?: boolean) => void
}
