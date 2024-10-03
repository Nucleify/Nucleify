import { roles } from 'atomic/bosons/constants'
import { ContactFieldInterface } from 'atomic/bosons/types'

export function useContactFields() {
    const fieldData: readonly ContactFieldInterface[] = [
        ['first_name', 'First Name'],
        ['last_name', 'Last Name'],
        ['email', 'Email'],
        ['personal_phone', 'Personal Phone'],
        ['work_phone', 'Work Phone'],
        ['address', 'Address'],
        ['birthday', 'Birthday'],
        ['contact_groups', 'Contact Groups'],
        ['role', 'Role'],
    ] as const

    const createAndEditFields: readonly ContactFieldInterface[] = fieldData.map(
        ([name, label]): readonly ContactFieldInterface[] => ({
            name,
            label,
            type:
                name === 'address'
                    ? 'textarea'
                    : name === 'birthday'
                      ? 'calendar'
                      : name === 'role'
                        ? 'dropdown'
                        : 'input-text',
            ...(name === 'email' && { props: { type: 'email' } }),
            ...(name === 'role' && {
                props: { options: roles, placeholder: 'Select a role' },
            }),
        })
    ) as const

    const showFields: readonly ContactFieldInterface[] = fieldData.map(
        ([key, label]): readonly ContactFieldInterface[] => ({
            key,
            label,
        })
    ) as const

    return {
        createAndEditFields,
        showFields,
    }
}
