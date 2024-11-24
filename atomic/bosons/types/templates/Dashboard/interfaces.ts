import { ObjectType } from 'atomic/bosons/types'

export interface DashboardInterface {
  data?: ObjectType[]
  getData?: () => void
  store?: () => void
  edit?: () => void
  delete?: () => void
  loading?: boolean
}
