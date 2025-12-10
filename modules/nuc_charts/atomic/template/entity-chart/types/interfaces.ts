import type {
  CardObjectInterface,
  ChartInterface,
  ChartMethodType,
  FeatureObjectInterface,
  FileObjectInterface,
  LinkObjectInterface,
  NucActivityObjectInterface,
  NucArticleObjectInterface,
  NucContactObjectInterface,
  NucDocumentationObjectInterface,
  NucMoneyObjectInterface,
  NucUserObjectInterface,
  QuestionObjectInterface,
  TaskObjectInterface,
  TechnologyObjectInterface,
} from 'atomic'

export interface NucEntityChartInterface extends ChartInterface {
  chartMethodType: ChartMethodType
  data?: NucEntityChartDataInterface
  example?: boolean
  direction?: string
}

export interface NucEntityChartDataInterface {
  activity?: NucActivityObjectInterface[]
  article?: NucArticleObjectInterface[]
  card?: CardObjectInterface[]
  contact?: NucContactObjectInterface[]
  documentation?: NucDocumentationObjectInterface[]
  feature?: FeatureObjectInterface[]
  file?: FileObjectInterface[]
  link?: LinkObjectInterface[]
  money?: NucMoneyObjectInterface[]
  question?: QuestionObjectInterface[]
  task?: TaskObjectInterface[]
  technology?: TechnologyObjectInterface[]
  user?: NucUserObjectInterface[]
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
