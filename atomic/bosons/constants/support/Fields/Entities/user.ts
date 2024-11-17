import { roles } from 'atomic/bosons/constants'
import { UseFieldsInterface, UserFieldInterface } from 'atomic/bosons/types'

export function useUserFields(): UseFieldsInterface<UserFieldInterface> {
  const fieldData: readonly [
    string,
    string,
    'input-text' | 'textarea' | 'dropdown' | 'calendar' | 'password',
  ][] = [
    ['name', 'Name', 'input-text'],
    ['email', 'Email', 'input-text'],
    ['role', 'Role', 'dropdown'],
    ['password', 'Password', 'password'],
    ['password_confirmation', 'Confirm Password', 'password'],
  ]

  const createFields: readonly UserFieldInterface[] = fieldData.map(
    ([name, label, type]) => {
      const field: UserFieldInterface = {
        name,
        label,
        type,
      }

      if (name === 'role') {
        field.props = {
          options: roles.map((role) => ({ label: role, value: role })),
          placeholder: 'Select a role',
        }
      } else if (name === 'password' || name === 'password_confirmation') {
        field.props = {
          type: 'password',
        }
      }

      return field
    }
  )

  const editFields: readonly UserFieldInterface[] = fieldData
    .filter(([name]) => name !== 'password' && name !== 'password_confirmation')
    .map(([name, label, type]) => {
      const field: UserFieldInterface = {
        name,
        label,
        type,
      }

      if (name === 'role') {
        field.props = {
          options: roles.map((role) => ({ label: role, value: role })),
          placeholder: 'Select a role',
        }
      }

      return field
    })

  const showFields: readonly UserFieldInterface[] = fieldData.map(
    ([key, label, type]) => ({
      name: key,
      key,
      label,
      type: type || 'input-text',
    })
  )

  return {
    createFields,
    editFields,
    showFields,
  }
}
