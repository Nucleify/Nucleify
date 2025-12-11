import type { EntityFieldInterface, UseFieldsInterface } from 'atomic'

export function useFeatureFields(): UseFieldsInterface<EntityFieldInterface> {
  const fieldData: readonly [string, string, string][] = [
    ['icon', 'Icon', 'input-text'],
    ['header', 'Header', 'input-text'],
    ['description', 'Description', 'textarea'],
    ['category', 'Category', 'input-text'],
    ['updated_at', 'Updated At', ''],
    ['created_at', 'Created At', ''],
  ] as const

  const createAndEditFields: readonly EntityFieldInterface[] = fieldData
    .filter(([name]) => !['created_at', 'updated_at'].includes(name))
    .map(([name, label, type]): EntityFieldInterface => {
      return { name, label, type }
    })

  const showFields: readonly { label: string; key: string }[] = fieldData.map(
    ([key, label]) => ({
      name: key,
      key,
      label,
    })
  )

  return {
    createAndEditFields,
    showFields,
  }
}
