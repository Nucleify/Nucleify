import type { EntityFieldInterface, UseFieldsInterface } from 'atomic'

export function useTechnologyFields(): UseFieldsInterface<EntityFieldInterface> {
  const fieldData: readonly [string, string, string][] = [
    ['href', 'Href', 'input-text'],
    ['src', 'Src', 'input-text'],
    ['label', 'Label', 'input-text'],
    ['description', 'Description', 'textarea'],
    ['category', 'Category', 'input-text'],
    ['display', 'Display', 'select'],
    ['updated_at', 'Updated At', ''],
    ['created_at', 'Created At', ''],
  ] as const

  const displayOptions: readonly boolean[] = [true, false]

  const createAndEditFields: readonly EntityFieldInterface[] = fieldData
    .filter(([name]) => !['created_at', 'updated_at'].includes(name))
    .map(([name, label, type]): EntityFieldInterface => {
      const props =
        name === 'display'
          ? {
              options: displayOptions,
              placeholder: 'Display technology on site',
            }
          : undefined

      return { name, label, type, props }
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
