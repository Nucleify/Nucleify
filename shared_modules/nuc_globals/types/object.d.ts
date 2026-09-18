import type { Ref } from 'vue'

import type {
  NucActivityObjectInterface,
  NucEntityRecordInterface,
  NucUserObjectInterface,
} from 'nucleify'

export {}

declare global {
  type ObjectType =
    | NucActivityObjectInterface
    | NucEntityRecordInterface
    | NucUserObjectInterface
    | Record<string, unknown>
    | undefined

  /** Entity slug or built-in object name (activity, user, …). */
  type ObjectNameType = string

  type SiteType = string

  type SelectedObjectType = Ref<ObjectType>
}
