import type { EntityFieldInterface, UseFieldsInterface } from 'nucleify'
import { roles } from 'nucleify'

export function useMoneyFields(): UseFieldsInterface<EntityFieldInterface> {
  const fieldData: readonly [string, string, string][] = [
    ['count', 'field-count', 'input-text'],
    ['sender', 'field-sender', 'input-text'],
    ['receiver', 'field-receiver', 'input-text'],
    ['title', 'field-title', 'input-text'],
    ['description', 'field-description', 'textarea'],
    ['category', 'field-category', 'input-text'],
    ['updated_at', 'field-updated-at', ''],
    ['created_at', 'field-created-at', ''],
  ] as const

  const createAndEditFields: EntityFieldInterface[] = fieldData
    .filter(([name]) => !['created_at', 'updated_at'].includes(name))
    .map(([name, label, type]): EntityFieldInterface => {
      const props =
        name === 'role'
          ? { options: roles, placeholder: 'field-select-role' }
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
