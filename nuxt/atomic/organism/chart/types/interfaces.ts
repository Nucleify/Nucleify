import type { CanvasHTMLAttributes } from 'vue'

import type {
  ActivityLogObjectInterface,
  ArticleObjectInterface,
  CardObjectInterface,
  ChartMethodType,
  ChartType,
  ContactObjectInterface,
  FeatureObjectInterface,
  LinkObjectInterface,
  MoneyObjectInterface,
  QuestionObjectInterface,
  TaskObjectInterface,
  TechnologyObjectInterface,
  UserObjectInterface,
} from 'atomic'

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
  activityLogData?: ActivityLogObjectInterface[]
  articleData?: ArticleObjectInterface[]
  cardData?: CardObjectInterface[]
  contactData?: ContactObjectInterface[]
  featureData?: FeatureObjectInterface[]
  linkData?: LinkObjectInterface[]
  moneyData?: MoneyObjectInterface[]
  questionData?: QuestionObjectInterface[]
  taskData?: TaskObjectInterface[]
  technologyData?: TechnologyObjectInterface[]
  userData?: UserObjectInterface[]
  chartClass?: string
  example?: boolean
}

export interface DisplayChartsInterface {
  [key: string]: boolean
  Activity: boolean
  Admin: boolean
  Article: boolean
  Contact: boolean
  Card: boolean
  Feature: boolean
  Link: boolean
  Money: boolean
  Question: boolean
  Structural: boolean
  Task: boolean
  Technology: boolean
}

export interface UseDisplayChartsInterface {
  display: DisplayChartsInterface
  displayChartsToggle: (action: string) => void
  setDefaultChartsDisplay: (initial?: boolean, reload?: boolean) => void
}
