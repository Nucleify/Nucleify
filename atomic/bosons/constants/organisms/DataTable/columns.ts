import { ColumnsInterface } from 'atomic/bosons/types'

export const columns: ColumnsInterface = {
    activity: [
        {
            field: 'id',
            header: 'ID',
            class: 'id-activity-column',
            sortable: true,
        },
        {
            field: 'description',
            header: 'Description',
            class: 'description-column',
            sortable: true,
        },
        {
            field: 'created_at',
            header: 'Created At',
            class: 'created-at-activity-column',
            sortable: true,
        },
    ],
    article: [
        {
            field: 'title',
            header: 'Title',
            class: 'title-column',
            sortable: true,
        },
        {
            field: 'category',
            header: 'Category',
            class: 'category-column desktop-column',
            sortable: true,
        },
        {
            field: 'created_at',
            header: 'Created At',
            class: 'created-at-column',
            sortable: true,
        },
        {
            field: 'updated_at',
            header: 'Updated At',
            class: 'updated-at-column',
            sortable: true,
        },
    ],
    contact: [
        {
            field: 'full_name',
            header: 'Full name',
            class: 'full-name-column',
            sortable: true,
        },
        {
            field: 'email',
            header: 'Email',
            class: 'email-column tablet-column',
            sortable: true,
        },
        {
            field: 'birthday',
            header: 'Birthday',
            class: 'birthday-column desktop-column',
            sortable: true,
        },
        {
            field: 'created_at',
            header: 'Created At',
            class: 'created-at-column',
            sortable: true,
        },
        {
            field: 'updated_at',
            header: 'Updated At',
            class: 'updated-at-column',
            sortable: true,
        },
    ],
    user: [
        { field: 'name', header: 'Name', class: 'name-column', sortable: true },
        {
            field: 'email',
            header: 'Email',
            class: 'email-column',
            sortable: true,
        },
        { field: 'role', header: 'Role', class: 'role-column', sortable: true },
        {
            field: 'created_at',
            header: 'Created At',
            class: 'created-at-column',
            sortable: true,
        },
        {
            field: 'updated_at',
            header: 'Updated At',
            class: 'updated-at-column',
            sortable: true,
        },
    ],
}
