// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { ColumnInterface, ColumnsInterface } from 'atomic'

const createColumn = (
  field: string,
  header: string,
  className: string,
  sortable: boolean = true
): ColumnInterface => ({
  field,
  header,
  class: className,
  sortable,
})

const columnsData: readonly ColumnsInterface[] = {
  activity: [
    ['id', 'ID', 'id-activity-column'],
    ['description', 'Description', 'description-column'],
    ['created_at', 'Created At', 'created-at-activity-column'],
  ],
  article: [
    ['title', 'Title', 'title-column'],
    ['category', 'Category', 'category-column desktop-column'],
    ['created_at', 'Created At', 'created-at-column'],
    ['updated_at', 'Updated At', 'updated-at-column'],
  ],
  card: [
    ['title', 'Title', 'title-column'],
    ['category', 'Category', 'category-column desktop-column'],
    ['created_at', 'Created At', 'created-at-column'],
    ['updated_at', 'Updated At', 'updated-at-column'],
  ],
  contact: [
    ['full_name', 'Full Name', 'full-name-column'],
    ['email', 'Email', 'email-column tablet-column'],
    ['birthday', 'Birthday', 'birthday-column desktop-column'],
    ['created_at', 'Created At', 'created-at-column'],
    ['updated_at', 'Updated At', 'updated-at-column'],
  ],
  documentation: [
    ['name', 'Name', 'name-column'],
    ['category', 'Category', 'category-column desktop-column'],
    ['file', 'File', 'file-column'],
    ['version', 'Version', 'version-column'],
    ['created_at', 'Created At', 'created-at-column'],
    ['updated_at', 'Updated At', 'updated-at-column'],
  ],
  feature: [
    ['header', 'Header', 'header-column'],
    ['category', 'Category', 'category-column desktop-column'],
    ['created_at', 'Created At', 'created-at-column'],
    ['updated_at', 'Updated At', 'updated-at-column'],
  ],
  file: [
    ['path', 'Path', 'path-column'],
    ['mime_type', 'Mime Type', 'mime-type-column'],
    ['size', 'Size', 'size-column'],
    ['created_at', 'Created At', 'created-at-column'],
    ['updated_at', 'Updated At', 'updated-at-column'],
  ],
  money: [
    ['title', 'Title', 'title-column'],
    ['category', 'Category', 'category-column desktop-column'],
    ['created_at', 'Created At', 'created-at-column'],
    ['updated_at', 'Updated At', 'updated-at-column'],
  ],
  user: [
    ['name', 'Name', 'name-column'],
    ['email', 'Email', 'email-column'],
    ['role', 'Role', 'role-column'],
    ['created_at', 'Created At', 'created-at-column'],
    ['updated_at', 'Updated At', 'updated-at-column'],
  ],
  question: [
    ['content', 'Content', 'content-column'],
    ['category', 'Category', 'category-column desktop-column'],
    ['created_at', 'Created At', 'created-at-column'],
    ['updated_at', 'Updated At', 'updated-at-column'],
  ],
  task: [
    ['title', 'Title', 'title-column'],
    ['description', 'Description', 'description-column'],
    ['created_at', 'Created At', 'created-at-column'],
    ['updated_at', 'Updated At', 'updated-at-column'],
  ],
  technology: [
    ['label', 'Label', 'label-column'],
    ['category', 'Category', 'category-column desktop-column'],
    ['created_at', 'Created At', 'created-at-column'],
    ['updated_at', 'Updated At', 'updated-at-column'],
  ],
  link: [
    ['src', 'Src', 'src-column'],
    ['category', 'Category', 'category-column desktop-column'],
    ['created_at', 'Created At', 'created-at-column'],
    ['updated_at', 'Updated At', 'updated-at-column'],
  ],
} as const

export const columns: readonly ColumnsInterface[] = Object.fromEntries(
  Object.entries(columnsData).map(
    ([key, data]): readonly ColumnsInterface[] => [
      key,
      data.map(([field, header, className]) =>
        createColumn(field, header, className)
      ),
    ]
  )
)
