import { roles } from 'atomic/bosons/constants'
import { UserFieldInterface } from 'atomic/bosons/types'

export function useUserFields() {
  const fieldData: readonly UserFieldInterface[] = [
    ['name', 'Name', 'input-text'],
    ['email', 'Email', 'input-text'],
    ['role', 'Role', 'dropdown'],
    ['password', 'Password', 'password'],
    ['password_confirmation', 'Confirm Password', 'password'],
  ] as const

  const createFields: readonly UserFieldInterface[] = fieldData.map(
    ([name, label, type]): readonly UserFieldInterface[] => ({
      name,
      label,
      type: type || 'input-text',
      ...(name === 'role' && {
        props: { options: roles, placeholder: 'Select a role' },
      }),
      ...(name === 'password' && { props: { type: 'password' } }),
      ...(name === 'password_confirmation' && {
        props: { type: 'password' },
      }),
    })
  ) as const

  const editFields: readonly UserFieldInterface[] = fieldData
    .filter(([name]) => name !== 'password' && name !== 'password_confirmation')
    .map(([name, label, type]): readonly UserFieldInterface[] => ({
      name,
      label,
      type: type || 'input-text',
      ...(name === 'role' && {
        props: { options: roles, placeholder: 'Select a role' },
      }),
    })) as const

  const showFields: readonly UserFieldInterface[] = [
    { label: 'Email', key: 'email' },
    { label: 'Role', key: 'role' },
    { label: 'Created At', key: 'created_at' },
    { label: 'Updated At', key: 'updated_at' },
  ] as const

  return {
    createFields,
    editFields,
    showFields,
  }
}
