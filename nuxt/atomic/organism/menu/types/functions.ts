import type { ObjectType } from 'atomic'

export type OpenMenuFunctionType = (
  // biome-ignore lint/suspicious/noExplicitAny: fix in future
  menu: any,
  event: MouseEvent,
  object: ObjectType
) => void
