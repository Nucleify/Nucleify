import type { MenuItem } from 'primevue/menuitem'

import type {
  ElementAppendTo,
  ObjectType,
  OpenMenuFunctionType,
  SelectedObjectType,
} from 'atomic'

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
