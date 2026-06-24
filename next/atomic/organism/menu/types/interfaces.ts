import { MenuProps } from 'primereact/menu'
import type { RefObject } from 'react'

export interface MenuInterface extends MenuProps {
  ref?: RefObject<{ toggle: (event: React.MouseEvent) => void }>
}
