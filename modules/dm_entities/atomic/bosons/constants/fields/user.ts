import type { EntityFieldInterface, UseFieldsInterface } from 'atomic'
import { roles } from 'atomic'

export function useUserFields(): UseFieldsInterface<EntityFieldInterface> {
  const fieldData: [string, string, string][] = [
    ['name', 'Name', 'input-text'],
    ['email', 'Email', 'input-text'],
    ['role', 'Role', 'select'],
    ['password', 'Password', 'password'],
    ['password_confirmation', 'Confirm Password', 'password'],
    ['updated_at', 'Updated At', ''],
    ['created_at', 'Created At', ''],
  ] as const

  const createFields: EntityFieldInterface[] = fieldData
    .filter(([name]) => !['created_at', 'updated_at'].includes(name))
    .map(([name, label, type]): EntityFieldInterface => {
      const props =
        name === 'role'
          ? { options: roles, placeholder: 'Select a role' }
          : undefined

      return { name, label, type, props }
    })

  const editFields: EntityFieldInterface[] = fieldData
    .filter(
      ([name]) =>
        ![
          'password',
          'password_confirmation',
          'created_at',
          'updated_at',
        ].includes(name)
    )
    .map(([name, label, type]): EntityFieldInterface => {
      const props =
        name === 'role'
          ? { options: roles, placeholder: 'Select a role' }
          : undefined

      return { name, label, type, props }
    })

  const showFields: readonly { label: string; key: string }[] = fieldData
    .filter(
      ([name]) => !['name', 'password', 'password_confirmation'].includes(name)
    )
    .map(([key, label]) => ({
      name: key,
      key,
      label,
    }))

  return {
    createFields,
    editFields,
    showFields,
  }
}
