import { MenuItem } from 'primevue/menuitem'
import { HintedString } from 'primevue/ts-helpers'

import {
  ObjectType,
  OpenMenuFunctionType,
  SelectedObjectType,
} from 'atomic/bosons/types'

export interface MenuInterface {
  ref: string
  model: MenuItem[]
  popup: boolean
  appendTo?: HTMLElement | HintedString<'body' | 'self'>
  autoZIndex?: boolean
  baseZIndex?: number
}

export interface UseMenuInterface {
  selectedObject: SelectedObjectType
  setSelectedObject: (object: ObjectType) => void
  openMenu: OpenMenuFunctionType
}
