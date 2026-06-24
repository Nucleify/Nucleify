import type { MouseEvent as ReactMouseEvent, RefObject } from 'react'

export type OpenMenuFunctionType = (
  menu:
    | RefObject<{ toggle: (event: ReactMouseEvent) => void }>
    | { toggle: (event: ReactMouseEvent) => void }
    | null,
  event: ReactMouseEvent,
  object: ObjectType
) => void
