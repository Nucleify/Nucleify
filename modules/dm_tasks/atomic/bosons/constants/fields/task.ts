import type { EntityFieldInterface, UseFieldsInterface } from 'atomic'

export function useTaskFields(): UseFieldsInterface<EntityFieldInterface> {
  const fieldData: readonly [string, string, string][] = [
    ['user_id', 'User ID', 'input-number'],
    ['assignee_id', 'Assignee ID', 'input-number'],
    ['collaborator_ids', 'Collaborator IDs', 'input-array'],
    ['title', 'Title', 'input-text'],
    ['description', 'Description', 'input-text'],
    ['start_date', 'Start Date', 'date-picker'],
    ['end_date', 'End Date', 'date-picker'],
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
