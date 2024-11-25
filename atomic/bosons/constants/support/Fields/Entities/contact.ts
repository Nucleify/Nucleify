import { roles } from 'atomic/bosons/constants'
import { ContactFieldInterface, UseFieldsInterface } from 'atomic/bosons/types'

export function useContactFields(): UseFieldsInterface<ContactFieldInterface> {
  const fieldData: readonly [string, string, string][] = [
    ['first_name', 'First Name', 'input-text'],
    ['last_name', 'Last Name', 'input-text'],
    ['email', 'Email', 'input-text'],
    ['personal_phone', 'Personal Phone', 'input-mask'],
    ['work_phone', 'Work Phone', 'input-mask'],
    ['address', 'Address', 'textarea'],
    ['birthday', 'Birthday', 'date-picker'],
    ['contact_groups', 'Contact Groups', 'input-text'],
    ['role', 'Role', 'select'],
    ['updated_at', 'Updated At', ''],
    ['created_at', 'Created At', ''],
  ] as const

  const createAndEditFields: ContactFieldInterface[] = fieldData
    .filter(([name]) => !['created_at', 'updated_at'].includes(name))
    .map(([name, label, type]): ContactFieldInterface => {
      const props =
        name === 'role'
          ? { options: roles, placeholder: 'Select a role' }
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
