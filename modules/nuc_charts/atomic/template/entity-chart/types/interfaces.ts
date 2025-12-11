import type {
  ChartInterface,
  ChartMethodType,
  NucActivityObjectInterface,
  NucArticleObjectInterface,
  NucCardObjectInterface,
  NucContactObjectInterface,
  NucDocumentationObjectInterface,
  NucFeatureObjectInterface,
  NucFileObjectInterface,
  NucLinkObjectInterface,
  NucMoneyObjectInterface,
  NucQuestionObjectInterface,
  NucTechnologyObjectInterface,
  NucUserObjectInterface,
  TaskObjectInterface,
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
  card?: NucCardObjectInterface[]
  contact?: NucContactObjectInterface[]
  documentation?: NucDocumentationObjectInterface[]
  feature?: NucFeatureObjectInterface[]
  file?: NucFileObjectInterface[]
  link?: NucLinkObjectInterface[]
  money?: NucMoneyObjectInterface[]
  question?: NucQuestionObjectInterface[]
  task?: TaskObjectInterface[]
  technology?: NucTechnologyObjectInterface[]
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
