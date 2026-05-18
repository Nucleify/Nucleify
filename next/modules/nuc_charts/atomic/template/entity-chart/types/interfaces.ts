import type {
  ChartInterface,
  ChartMethodType,
  NucActivityObjectInterface,
  NucArticleObjectInterface,
  NucContactObjectInterface,
  NucFileObjectInterface,
  NucMoneyObjectInterface,
  NucQuestionObjectInterface,
  NucTechnologyObjectInterface,
  NucUserObjectInterface,
} from '../../../../types/interfaces'

export interface NucEntityChartInterface extends ChartInterface {
  chartMethodType: ChartMethodType
  data?: NucEntityChartDataInterface
  example?: boolean
  direction?: string
}

export interface NucEntityChartDataInterface {
  activity?: NucActivityObjectInterface[]
  article?: NucArticleObjectInterface[]
  contact?: NucContactObjectInterface[]
  file?: NucFileObjectInterface[]
  money?: NucMoneyObjectInterface[]
  question?: NucQuestionObjectInterface[]
  technology?: NucTechnologyObjectInterface[]
  user?: NucUserObjectInterface[]
}

export interface DisplayChartsInterface {
  [key: string]: boolean
  Activity: boolean
  Admin: boolean
  Article: boolean
  Contact: boolean
  File: boolean
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
