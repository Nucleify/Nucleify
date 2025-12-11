import type {
  LoadingType,
  NucArticleObjectInterface,
  NucContactObjectInterface,
  NucMoneyObjectInterface,
} from 'atomic'

export interface PolarChartInterface {
  articles: NucArticleObjectInterface[]
  contacts: NucContactObjectInterface[]
  money: NucMoneyObjectInterface[]
  loading: LoadingType
}
