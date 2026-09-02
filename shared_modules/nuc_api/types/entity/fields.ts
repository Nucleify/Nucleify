export interface EntityFieldInterface {
  name: string
  label: string
  type: string
}

export interface UseFieldsInterface<TField = EntityFieldInterface> {
  createAndEditFields: readonly TField[]
  showFields: readonly { name?: string; key: string; label: string }[]
}
