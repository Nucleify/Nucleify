import type { ObjectType } from 'atomic'

export interface DashboardInterface {
  data?: ObjectType[]
  getData?: () => void
  store?: () => void
  edit?: () => void
  delete?: () => void
  loading?: boolean
}
