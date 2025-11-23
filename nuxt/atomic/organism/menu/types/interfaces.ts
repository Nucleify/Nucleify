import { MenuProps } from 'primevue'

import type { OpenMenuFunctionType } from 'atomic'

export interface MenuInterface extends MenuProps {
  ref: string
}

export interface UseMenuInterface {
  selectedObject: SelectedObjectType
  setSelectedObject: (object: ObjectType) => void
  openMenu: OpenMenuFunctionType
}
