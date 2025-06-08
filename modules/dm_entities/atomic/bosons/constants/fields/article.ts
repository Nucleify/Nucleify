import type { EntityFieldInterface, UseFieldsInterface } from 'atomic'

export function useArticleFields(): UseFieldsInterface<EntityFieldInterface> {
  const fieldData: readonly [string, string, string][] = [
    ['title', 'Title', 'input-text'],
    ['description', 'Description', 'textarea'],
    ['category', 'Category', 'input-text'],
    ['updated_at', 'Updated At', ''],
    ['created_at', 'Created At', ''],
  ] as const

  const createAndEditFields: readonly EntityFieldInterface[] = fieldData
    .filter(([name]) => !['created_at', 'updated_at'].includes(name))
    .map(
      ([name, label, type]): EntityFieldInterface => ({
        name,
        label,
        type,
      })
    )

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
