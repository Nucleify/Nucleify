import { MenuProps } from 'primevue'

import type { OpenMenuFunctionType } from './functions'

export interface MenuInterface extends MenuProps {}

export interface UseMenuInterface {
  selectedObject: SelectedObjectType
  setSelectedObject: (object: ObjectType) => void
  openMenu: OpenMenuFunctionType
}
