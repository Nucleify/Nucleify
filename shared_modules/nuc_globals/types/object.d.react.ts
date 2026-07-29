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

  type ObjectNameType = string

  type SiteType = string

  type SelectedObjectType = ObjectType
}
