import type { EntityFieldInterface, UseFieldsInterface } from '../../types'

export function useFileFields(): UseFieldsInterface<EntityFieldInterface> {
  const fieldData: readonly [string, string, string][] = [
    ['user_id', 'field-user-id', 'input-text'],
    ['path', 'field-path', 'input-text'],
    ['mime_type', 'field-mime-type', 'input-text'],
    ['size', 'field-size', 'input-text'],
    ['updated_at', 'field-updated-at', ''],
    ['created_at', 'field-created-at', ''],
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
