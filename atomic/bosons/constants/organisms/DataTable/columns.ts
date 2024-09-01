import { ColumnsInterface } from 'atomic/bosons/types'

export const columns: ColumnsInterface = {
    activity: [
        {
            field: 'id',
            header: 'ID',
            class: 'idActivityColumn',
            sortable: true,
        },
        {
            field: 'description',
            header: 'Description',
            class: 'descriptionColumn',
            sortable: true,
        },
        {
            field: 'created_at',
            header: 'Created At',
            class: 'createdAtActivityColumn',
            sortable: true,
        },
    ],
    article: [
        {
            field: 'title',
            header: 'Title',
            class: 'titleColumn',
            sortable: true,
        },
        {
            field: 'category',
            header: 'Category',
            class: 'categoryColumn desktopColumn',
            sortable: true,
        },
        {
            field: 'created_at',
            header: 'Created At',
            class: 'createdAtColumn',
            sortable: true,
        },
        {
            field: 'updated_at',
            header: 'Updated At',
            class: 'updatedAtColumn',
            sortable: true,
        },
    ],
    contact: [
        {
            field: 'full_name',
            header: 'Full name',
            class: 'fullNameColumn',
            sortable: true,
        },
        {
            field: 'email',
            header: 'Email',
            class: 'emailColumn tabletColumn',
            sortable: true,
        },
        {
            field: 'birthday',
            header: 'Birthday',
            class: 'birthdayColumn desktopColumn',
            sortable: true,
        },
        {
            field: 'created_at',
            header: 'Created At',
            class: 'createdAtColumn',
            sortable: true,
        },
        {
            field: 'updated_at',
            header: 'Updated At',
            class: 'updatedAtColumn',
            sortable: true,
        },
    ],
    user: [
        { field: 'name', header: 'Name', class: 'nameColumn', sortable: true },
        {
            field: 'email',
            header: 'Email',
            class: 'emailColumn',
            sortable: true,
        },
        { field: 'role', header: 'Role', class: 'roleColumn', sortable: true },
        {
            field: 'created_at',
            header: 'Created At',
            class: 'createdAtColumn',
            sortable: true,
        },
        {
            field: 'updated_at',
            header: 'Updated At',
            class: 'updatedAtColumn',
            sortable: true,
        },
    ],
}
