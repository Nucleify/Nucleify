import Menu from 'primevue/menu'

import { ObjectType } from 'atomic'

export type OpenMenuFunctionType = (
  menu: Menu,
  event: MouseEvent,
  object: ObjectType
) => void
