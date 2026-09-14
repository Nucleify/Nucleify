import type { EntityFieldInterface, UseFieldsInterface } from 'nucleify'

export function useTranslationFields(): UseFieldsInterface<EntityFieldInterface> {
  const fieldData: readonly [string, string, string][] = [
    ['locale', 'field-locale', 'input-text'],
    ['key', 'field-key', 'input-text'],
    ['value', 'field-value', 'textarea'],
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
