import type { MouseEvent as ReactMouseEvent, RefObject } from 'react'

import type { ObjectType } from './interfaces'

export type OpenMenuFunctionType = (
  menu:
    | RefObject<{ toggle: (event: ReactMouseEvent) => void }>
    | { toggle: (event: ReactMouseEvent) => void }
    | null,
  event: ReactMouseEvent,
  object: ObjectType
) => void
