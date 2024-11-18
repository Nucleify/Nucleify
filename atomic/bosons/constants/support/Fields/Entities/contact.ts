import { roles } from 'atomic/bosons/constants'
import { ContactFieldInterface, UseFieldsInterface } from 'atomic/bosons/types'

export function useContactFields(): UseFieldsInterface<ContactFieldInterface> {
  const fieldData: readonly [string, string][] = [
    ['first_name', 'First Name'],
    ['last_name', 'Last Name'],
    ['email', 'Email'],
    ['personal_phone', 'Personal Phone'],
    ['work_phone', 'Work Phone'],
    ['address', 'Address'],
    ['birthday', 'Birthday'],
    ['contact_groups', 'Contact Groups'],
    ['role', 'Role'],
  ]

  const createAndEditFields: readonly ContactFieldInterface[] = fieldData.map(
    ([name, label]) => {
      const field: ContactFieldInterface = {
        name,
        label,
        type:
          name === 'address'
            ? 'textarea'
            : name === 'birthday'
              ? 'calendar'
              : name === 'role'
                ? 'dropdown'
                : name === 'personal_phone' || name === 'work_phone'
                  ? 'input-mask'
                  : 'input-text',
        ...(name === 'email' && { props: { type: 'email' } }),
        ...(name === 'role' && {
          props: { options: roles, placeholder: 'Select a role' },
        }),
      }
      return field
    }
  )

  const showFields: readonly { label: string; key: string }[] = fieldData.map(
    ([key, label]) => ({
      name: key,
      key,
      label,
      type: 'input-text',
    })
  )

  return {
    createAndEditFields,
    showFields,
  }
}
