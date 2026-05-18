import { MenuProps } from 'primereact/menu'
import type { RefObject } from 'react'

import type { OpenMenuFunctionType } from './functions'

export type ObjectType = Record<string, unknown>
export type SelectedObjectType = ObjectType | undefined

export interface MenuInterface extends MenuProps {
  ref?: RefObject<{ toggle: (event: React.MouseEvent) => void }>
}
