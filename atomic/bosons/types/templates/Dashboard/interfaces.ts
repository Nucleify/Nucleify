import { ObjectType } from '@/types'

export interface DashboardInterface {
    data?: ObjectType[] | undefined
    getData?: () => void
    store?: () => void
    edit?: () => void
    delete?: () => void
    loading?: boolean
}
