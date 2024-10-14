import Menu from 'primevue/menu'

import { ObjectType } from 'atomic/bosons/types'

export type OpenMenuFunctionType = (
  menu: Menu,
  event: MouseEvent,
  object: ObjectType
) => void
