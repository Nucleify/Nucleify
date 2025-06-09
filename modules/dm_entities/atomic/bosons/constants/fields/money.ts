import type { EntityFieldInterface, UseFieldsInterface } from 'atomic'
import { roles } from 'atomic'

export function useMoneyFields(): UseFieldsInterface<EntityFieldInterface> {
  const fieldData: readonly [string, string, string][] = [
    ['count', 'Count', 'input-text'],
    ['sender', 'Sender', 'input-text'],
    ['receiver', 'Receiver', 'input-text'],
    ['title', 'Title', 'input-text'],
    ['description', 'Description', 'textarea'],
    ['category', 'Category', 'input-text'],
    ['updated_at', 'Updated At', ''],
    ['created_at', 'Created At', ''],
  ] as const

  const createAndEditFields: EntityFieldInterface[] = fieldData
    .filter(([name]) => !['created_at', 'updated_at'].includes(name))
    .map(([name, label, type]): EntityFieldInterface => {
      const props =
        name === 'role'
          ? { options: roles, placeholder: 'Select a role' }
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
