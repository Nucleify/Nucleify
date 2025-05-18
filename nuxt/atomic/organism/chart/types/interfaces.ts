import { CanvasHTMLAttributes } from 'vue'

import {
  ActivityLogObjectInterface,
  ArticleObjectInterface,
  ContactObjectInterface,
  ChartType,
  ChartMethodType,
  MoneyObjectInterface,
  QuestionObjectInterface,
  TechnologyObjectInterface,
  UserObjectInterface,
  CardObjectInterface,
  LinkObjectInterface,
  FeatureObjectInterface,
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
  activityLogData?: ActivityLogObjectInterface[]
  articleData?: ArticleObjectInterface[]
  cardData?: CardObjectInterface[]
  contactData?: ContactObjectInterface[]
  featureData?: FeatureObjectInterface[]
  linkData?: LinkObjectInterface[]
  moneyData?: MoneyObjectInterface[]
  questionData?: QuestionObjectInterface[]
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
  Technology: boolean
}

export interface UseDisplayChartsInterface {
  display: DisplayChartsInterface
  displayChartsToggle: (action: string) => void
  setDefaultChartsDisplay: (initial?: boolean, reload?: boolean) => void
}
