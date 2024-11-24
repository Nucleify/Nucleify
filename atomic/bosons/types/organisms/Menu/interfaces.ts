import { MenuItem } from 'primevue/menuitem'

import {
  ElementAppendTo,
  ObjectType,
  OpenMenuFunctionType,
  SelectedObjectType,
} from 'atomic/bosons/types'

export interface MenuInterface {
  ref: string
  model: MenuItem[]
  popup: boolean
  appendTo?: ElementAppendTo
  autoZIndex?: boolean
  baseZIndex?: number
}

export interface UseMenuInterface {
  selectedObject: SelectedObjectType
  setSelectedObject: (object: ObjectType) => void
  openMenu: OpenMenuFunctionType
}
