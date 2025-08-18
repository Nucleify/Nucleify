import type {
  ActivityLogObjectInterface,
  ArticleObjectInterface,
  CardObjectInterface,
  ChartInterface,
  ChartMethodType,
  ContactObjectInterface,
  FeatureObjectInterface,
  FileObjectInterface,
  LinkObjectInterface,
  MoneyObjectInterface,
  QuestionObjectInterface,
  TaskObjectInterface,
  TechnologyObjectInterface,
  UserObjectInterface,
} from 'atomic'

export interface DMEntityChartInterface extends ChartInterface {
  chartMethodType: ChartMethodType
  activityLogData?: ActivityLogObjectInterface[]
  articleData?: ArticleObjectInterface[]
  cardData?: CardObjectInterface[]
  contactData?: ContactObjectInterface[]
  featureData?: FeatureObjectInterface[]
  fileData?: FileObjectInterface[]
  linkData?: LinkObjectInterface[]
  moneyData?: MoneyObjectInterface[]
  questionData?: QuestionObjectInterface[]
  taskData?: TaskObjectInterface[]
  technologyData?: TechnologyObjectInterface[]
  userData?: UserObjectInterface[]
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
  File: boolean
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
