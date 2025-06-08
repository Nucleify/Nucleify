import type { EntityFieldInterface, UseFieldsInterface } from 'atomic'

export function useCardFields(): UseFieldsInterface<EntityFieldInterface> {
  const fieldData: readonly [string, string, string][] = [
    ['src', 'Src', 'input-text'],
    ['title', 'Title', 'input-text'],
    ['description', 'Description', 'input-text'],
    ['category', 'Category', 'input-text'],
    ['component', 'Component', 'input-text'],
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
          ? { options: displayOptions, placeholder: 'Display card' }
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
