import { ObjectType } from '@/types'

export interface DashboardInterface {
    data?: ObjectType[] | undefined
    getData?: () => void
    loading?: boolean
}
