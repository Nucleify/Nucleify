import { roles } from 'atomic/bosons/constants'

export function useUserFields() {
    const createFields = [
        { name: 'name', label: 'Name', type: 'input-text' },
        { name: 'email', label: 'Email', type: 'input-text' },
        {
            name: 'role',
            label: 'Role',
            type: 'dropdown',
            props: { options: roles, placeholder: 'Select a role' },
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
            props: { type: 'password' },
        },
        {
            name: 'password_confirmation',
            label: 'Confirm Password',
            type: 'password',
            props: { type: 'password' },
        },
    ]

    const editFields = [
        { name: 'name', label: 'Name', type: 'input-text' },
        { name: 'email', label: 'Email', type: 'input-text' },
        {
            name: 'role',
            label: 'Role',
            type: 'dropdown',
            props: { options: roles, placeholder: 'Select a role' },
        },
    ]

    const showFields = [
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
