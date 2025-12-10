import type {
  ArticleObjectInterface,
  CardObjectInterface,
  ChartInterface,
  ChartMethodType,
  ContactObjectInterface,
  FeatureObjectInterface,
  FileObjectInterface,
  LinkObjectInterface,
  MoneyObjectInterface,
  NucActivityObjectInterface,
  NucDocumentationObjectInterface,
  QuestionObjectInterface,
  TaskObjectInterface,
  TechnologyObjectInterface,
  UserObjectInterface,
} from 'atomic'

export interface NucEntityChartInterface extends ChartInterface {
  chartMethodType: ChartMethodType
  data?: NucEntityChartDataInterface
  example?: boolean
  direction?: string
}

export interface NucEntityChartDataInterface {
  activity?: NucActivityObjectInterface[]
  article?: ArticleObjectInterface[]
  card?: CardObjectInterface[]
  contact?: ContactObjectInterface[]
  documentation?: NucDocumentationObjectInterface[]
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
