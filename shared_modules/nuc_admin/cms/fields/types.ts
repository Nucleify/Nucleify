/** Schema-driven field config for admin collections/globals. */

export type FieldAdminPosition = 'sidebar' | 'main'

export type FieldAdminOptions = {
  position?: FieldAdminPosition
  description?: string
  readOnly?: boolean
  disabled?: boolean
  width?: string
  hidden?: boolean
}

type FieldBase = {
  name: string
  label?: string
  required?: boolean
  defaultValue?: unknown
  localized?: boolean
  admin?: FieldAdminOptions
}

export type TextFieldConfig = FieldBase & {
  type:
    | 'text'
    | 'email'
    | 'textarea'
    | 'number'
    | 'checkbox'
    | 'select'
    | 'date'
    | 'json'
  options?: { label: string; value: string }[]
}

export type GroupFieldConfig = FieldBase & {
  type: 'group'
  fields: FieldConfig[]
}

export type ArrayFieldConfig = FieldBase & {
  type: 'array'
  fields: FieldConfig[]
}

export type BlocksFieldConfig = FieldBase & {
  type: 'blocks'
  /** Allowed widget type strings from the registry. Empty = all registered. */
  blocks?: string[]
}

export type TabsFieldConfig = {
  type: 'tabs'
  name?: string
  label?: string
  tabs: { label: string; name?: string; fields: FieldConfig[] }[]
  admin?: FieldAdminOptions
}

export type RowFieldConfig = {
  type: 'row'
  name?: string
  fields: FieldConfig[]
  admin?: FieldAdminOptions
}

export type FieldConfig =
  | TextFieldConfig
  | GroupFieldConfig
  | ArrayFieldConfig
  | BlocksFieldConfig
  | TabsFieldConfig
  | RowFieldConfig

export type CollectionConfig = {
  slug: string
  labels: { singular: string; plural: string }
  fields: FieldConfig[]
}

export type GlobalConfig = {
  slug: string
  label: string
  fields: FieldConfig[]
}

export type AdminRootConfig = {
  userCollection: 'users'
  theme: 'dark' | 'light' | 'all'
  dateFormat: string
  toast: { durationMs: number; limit: number; position: string }
  collections: CollectionConfig[]
  globals: GlobalConfig[]
}
