import { ObjectType } from 'atomic/bosons/types'

export interface ActionInterface {
  icon: string
  click: (data: ObjectType) => void
}
