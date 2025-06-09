import type { ObjectType } from 'atomic'

export interface ActionInterface {
  icon: string
  click: (data: ObjectType) => void
}
