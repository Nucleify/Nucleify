export interface UseFieldsInterface<T> {
  fieldData?:
    | readonly [string, string][]
    | [
        string,
        string,
        'input-text' | 'textarea' | 'dropdown' | 'calendar' | 'password',
      ][]
  createAndEditFields?: readonly T[]
  showFields?: readonly T[]
  createFields?: readonly T[]
  editFields?: readonly T[]
}
