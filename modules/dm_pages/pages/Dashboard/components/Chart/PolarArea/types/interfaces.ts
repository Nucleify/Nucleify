import type {
  ArticleObjectInterface,
  ContactObjectInterface,
  LoadingType,
  MoneyObjectInterface,
} from 'atomic'

export interface PolarChartInterface {
  articles: ArticleObjectInterface[]
  contacts: ContactObjectInterface[]
  money: MoneyObjectInterface[]
  loading: LoadingType
}
