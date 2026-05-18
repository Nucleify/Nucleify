import type { EntityFieldInterface, UseFieldsInterface } from 'nucleify'

export function useQuestionFields(): UseFieldsInterface<EntityFieldInterface> {
  const fieldData: readonly [string, string, string][] = [
    ['index', 'field-index', 'input-text'],
    ['content', 'field-content', 'input-text'],
    ['answer', 'field-answer', 'textarea'],
    ['category', 'field-category', 'input-text'],
    ['display', 'field-display', 'select'],
    ['updated_at', 'field-updated-at', ''],
    ['created_at', 'field-created-at', ''],
  ] as const

  const displayOptions: readonly boolean[] = [true, false]

  const createAndEditFields: readonly EntityFieldInterface[] = fieldData
    .filter(([name]) => !['created_at', 'updated_at'].includes(name))
    .map(([name, label, type]): EntityFieldInterface => {
      const props =
        name === 'display'
          ? { options: displayOptions, placeholder: 'field-display-question' }
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
