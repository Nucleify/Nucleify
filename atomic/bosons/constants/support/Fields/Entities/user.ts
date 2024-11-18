import { roles } from 'atomic/bosons/constants'
import { UseFieldsInterface, UserFieldInterface } from 'atomic/bosons/types'

export function useUserFields(): UseFieldsInterface<UserFieldInterface> {
  const fieldData: [string, string, string][] = [
    ['name', 'Name', 'input-text'],
    ['email', 'Email', 'input-text'],
    ['role', 'Role', 'dropdown'],
    ['password', 'Password', 'password'],
    ['password_confirmation', 'Confirm Password', 'password'],
  ]

  const createFields: UserFieldInterface[] = fieldData.map(
    ([name, label, type]): UserFieldInterface => {
      const props =
        name === 'role'
          ? { options: roles, placeholder: 'Select a role' }
          : name === 'password' || name === 'password_confirmation'
            ? { type: 'password' }
            : undefined

      return { name, label, type, props }
    }
  )

  const editFields: UserFieldInterface[] = fieldData
    .filter(([name]) => name !== 'password' && name !== 'password_confirmation')
    .map(([name, label, type]): UserFieldInterface => {
      const props =
        name === 'role'
          ? { options: roles, placeholder: 'Select a role' }
          : undefined

      return { name, label, type, props }
    })

  const showFields: readonly { label: string; key: string }[] = [
    { label: 'Email', key: 'email' },
    { label: 'Role', key: 'role' },
    { label: 'Created At', key: 'created_at' },
    { label: 'Updated At', key: 'updated_at' },
  ]

  return {
    createFields,
    editFields,
    showFields,
  }
}
