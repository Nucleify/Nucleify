export interface UseFieldsInterface<T> {
  fieldData?:
    | readonly [string, string][]
    | [
        string,
        string,
        'input-text' | 'textarea' | 'select' | 'date-picker' | 'password',
      ][]
  createAndEditFields?: readonly T[]
  showFields?: readonly { label: string; key: string }[]
  createFields?: readonly T[]
  editFields?: readonly T[]
}

export interface EntityFieldInterface {
  name: string
  label: string
  type: string
  props?: {
    options?: readonly string[] | readonly boolean[]
    placeholder?: string
    type?: string
  }
  key?: string
}
