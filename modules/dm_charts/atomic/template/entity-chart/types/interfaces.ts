import type {
  ActivityLogObjectInterface,
  ArticleObjectInterface,
  CardObjectInterface,
  ChartInterface,
  ChartMethodType,
  ContactObjectInterface,
  DocumentationObjectInterface,
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
  data?: DMEntityChartDataInterface
  example?: boolean
}

export interface DMEntityChartDataInterface {
  activity?: ActivityLogObjectInterface[]
  article?: ArticleObjectInterface[]
  card?: CardObjectInterface[]
  contact?: ContactObjectInterface[]
  documentation?: DocumentationObjectInterface[]
  feature?: FeatureObjectInterface[]
  file?: FileObjectInterface[]
  link?: LinkObjectInterface[]
  money?: MoneyObjectInterface[]
  question?: QuestionObjectInterface[]
  task?: TaskObjectInterface[]
  technology?: TechnologyObjectInterface[]
  user?: UserObjectInterface[]
}

export interface DisplayChartsInterface {
  [key: string]: boolean
  Activity: boolean
  Admin: boolean
  Article: boolean
  Contact: boolean
  Card: boolean
  Documentation: boolean
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
