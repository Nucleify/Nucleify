export const columns = {
    activity: [
        { field: 'id', header: 'ID', class: 'idActivityColumn' },
        {
            field: 'description',
            header: 'Description',
            class: 'descriptionColumn',
        },
        {
            field: 'created_at',
            header: 'Created At',
            class: 'createdAtActivityColumn',
        },
    ],
    article: [
        { field: 'title', header: 'Title', class: 'titleColumn' },
        {
            field: 'category',
            header: 'Category',
            class: 'categoryColumn desktopColumn',
        },
        { field: 'created_at', header: 'Created At', class: 'createdAtColumn' },
        { field: 'updated_at', header: 'Updated At', class: 'updatedAtColumn' },
    ],
    contact: [
        { field: 'full_name', header: 'Full name', class: 'fullNameColumn' },
        { field: 'email', header: 'Email', class: 'emailColumn tabletColumn' },
        {
            field: 'birthday',
            header: 'Birthday',
            class: 'birthdayColumn desktopColumn',
        },
        { field: 'created_at', header: 'Created At', class: 'createdAtColumn' },
        { field: 'updated_at', header: 'Updated At', class: 'updatedAtColumn' },
    ],
    user: [
        { field: 'name', header: 'Name', class: 'nameColumn' },
        { field: 'email', header: 'Email', class: 'emailColumn' },
        { field: 'role', header: 'Role', class: 'roleColumn' },
        { field: 'created_at', header: 'Created At', class: 'createdAtColumn' },
        { field: 'updated_at', header: 'Updated At', class: 'updatedAtColumn' },
    ],
}
