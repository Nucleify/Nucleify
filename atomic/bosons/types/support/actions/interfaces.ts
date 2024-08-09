import { ObjectType } from '@/types'

export interface ActionInterface {
    icon: string
    click: (data: ObjectType) => void
}
