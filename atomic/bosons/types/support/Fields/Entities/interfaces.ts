export interface UseFieldsInterface<T> {
  fieldData?:
    | readonly [string, string][]
    | [
        string,
        string,
        'input-text' | 'textarea' | 'dropdown' | 'calendar' | 'password',
      ][]
  createAndEditFields?: readonly T[]
  showFields?: readonly { label: string; key: string }[]
  createFields?: readonly T[]
  editFields?: readonly T[]
}
