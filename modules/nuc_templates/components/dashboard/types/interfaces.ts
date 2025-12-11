export interface NucDashboardInterface {
  data?: ObjectType[]
  getData?: () => void
  store?: () => void
  edit?: () => void
  delete?: () => void
  loading?: boolean
}
