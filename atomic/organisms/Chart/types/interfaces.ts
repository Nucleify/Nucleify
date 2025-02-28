import { CanvasHTMLAttributes } from 'vue'

import {
  ActivityLogInterface,
  ArticleInterface,
  ContactInterface,
  ChartType,
  ChartMethodType,
  MoneyInterface,
  QuestionInterface,
  TechnologyInterface,
  UserInterface,
} from 'atomic'

export interface ChartInterface {
  type: ChartType
  data?: object
  options?: object
  plugins?: any // eslint-disable-line
  width?: number
  height?: number
  canvasProps?: CanvasHTMLAttributes
  dt?: any // eslint-disable-line
  pt?: any // eslint-disable-line
  ptOptions?: any // eslint-disable-line
  direction?: string
  chartMethodType: ChartMethodType
  activityLogData?: ActivityLogInterface[]
  articleData?: ArticleInterface[]
  contactData?: ContactInterface[]
  moneyData?: MoneyInterface[]
  questionData?: QuestionInterface[]
  technologyData?: TechnologyInterface[]
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
  Question: boolean
  Structural: boolean
  Technology: boolean
}

export interface UseDisplayChartsInterface {
  display: DisplayChartsInterface
  displayChartsToggle: (action: string) => void
  setDefaultChartsDisplay: (initial?: boolean, reload?: boolean) => void
}
