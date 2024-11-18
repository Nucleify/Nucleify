import { roles } from 'atomic/bosons/constants'
import { UseFieldsInterface, UserFieldInterface } from 'atomic/bosons/types'

export function useUserFields(): UseFieldsInterface<UserFieldInterface> {
  const fieldData: [string, string, string][] = [
    ['name', 'Name', 'input-text'],
    ['email', 'Email', 'input-text'],
    ['role', 'Role', 'dropdown'],
    ['password', 'Password', 'password'],
    ['password_confirmation', 'Confirm Password', 'password'],
    ['updated_at', 'Updated At', ''],
    ['created_at', 'Created At', ''],
  ] as const

  const createFields: UserFieldInterface[] = fieldData
    .filter(([name]) => !['created_at', 'updated_at'].includes(name))
    .map(([name, label, type]): UserFieldInterface => {
      const props =
        name === 'role'
          ? { options: roles, placeholder: 'Select a role' }
          : undefined

      return { name, label, type, props }
    })

  const editFields: UserFieldInterface[] = fieldData
    .filter(
      ([name]) =>
        ![
          'password',
          'password_confirmation',
          'created_at',
          'updated_at',
        ].includes(name)
    )
    .map(([name, label, type]): UserFieldInterface => {
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
