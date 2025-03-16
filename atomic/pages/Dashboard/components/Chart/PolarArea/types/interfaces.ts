import {
  ArticleInterface,
  ContactInterface,
  LoadingType,
  MoneyInterface,
} from 'atomic'

export interface PolarChartInterface {
  articles: ArticleInterface[]
  contacts: ContactInterface[]
  money: MoneyInterface[]
  loading: LoadingType
}
