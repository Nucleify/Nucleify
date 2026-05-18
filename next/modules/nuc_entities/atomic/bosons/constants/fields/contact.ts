import type { EntityFieldInterface, UseFieldsInterface } from 'nucleify'
import { roles } from 'nucleify'

export function useContactFields(): UseFieldsInterface<EntityFieldInterface> {
  const fieldData: readonly [string, string, string][] = [
    ['first_name', 'field-first-name', 'input-text'],
    ['last_name', 'field-last-name', 'input-text'],
    ['email', 'field-email', 'input-text'],
    ['personal_phone', 'field-personal-phone', 'input-mask'],
    ['work_phone', 'field-work-phone', 'input-mask'],
    ['address', 'field-address', 'textarea'],
    ['birthday', 'field-birthday', 'date-picker'],
    ['contact_groups', 'field-contact-groups', 'input-text'],
    ['role', 'field-role', 'select'],
    ['updated_at', 'field-updated-at', ''],
    ['created_at', 'field-created-at', ''],
  ] as const

  const createAndEditFields: EntityFieldInterface[] = fieldData
    .filter(([name]) => !['created_at', 'updated_at'].includes(name))
    .map(([name, label, type]): EntityFieldInterface => {
      const props =
        name === 'role'
          ? { options: roles, placeholder: 'field-select-role' }
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
