import { roles } from 'atomic/bosons/constants'

export function useContactFields() {
    const createAndEditFields = [
        { name: 'first_name', label: 'First Name', type: 'input-text' },
        { name: 'last_name', label: 'Last Name', type: 'input-text' },
        {
            name: 'email',
            label: 'Email',
            type: 'input-text',
            props: { type: 'email' },
        },
        { name: 'personal_phone', label: 'Personal Phone', type: 'input-text' },
        { name: 'work_phone', label: 'Work Phone', type: 'input-text' },
        { name: 'address', label: 'Address', type: 'textarea' },
        { name: 'birthday', label: 'Birthday', type: 'input-date' },
        { name: 'contact_groups', label: 'Contact Groups', type: 'input-text' },
        {
            name: 'role',
            label: 'Role',
            type: 'dropdown',
            props: { options: roles, placeholder: 'Select a role' },
        },
    ]

    const showFields = [
        { label: 'First Name', key: 'first_name' },
        { label: 'Last Name', key: 'last_name' },
        { label: 'Email', key: 'email' },
        { label: 'Personal Phone', key: 'personal_phone' },
        { label: 'Work Phone', key: 'work_phone' },
        { label: 'Address', key: 'address' },
        { label: 'Birthday', key: 'birthday' },
        { label: 'Contact Groups', key: 'contact_groups' },
        { label: 'Role', key: 'role' },
        { label: 'Created At', key: 'created_at' },
        { label: 'Updated At', key: 'updated_at' },
    ]

    return {
        createAndEditFields,
        showFields,
    }
}
