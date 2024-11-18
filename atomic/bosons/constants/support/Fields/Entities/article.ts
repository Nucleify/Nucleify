import { ArticleFieldInterface, UseFieldsInterface } from 'atomic/bosons/types'

export function useArticleFields(): UseFieldsInterface<ArticleFieldInterface> {
  const fieldData: readonly [string, string][] = [
    ['title', 'Title'],
    ['description', 'Description'],
    ['category', 'Category'],
  ] as const

  const createAndEditFields: readonly ArticleFieldInterface[] = fieldData.map(
    ([name, label]): ArticleFieldInterface => ({
      name,
      label,
      type: name === 'description' ? 'textarea' : 'input-text',
    })
  )

  const showFields: readonly { label: string; key: string }[] = [
    { label: 'Title', key: 'title' },
    { label: 'Description', key: 'description' },
    { label: 'Category', key: 'category' },
    { label: 'Created At', key: 'created_at' },
    { label: 'Updated At', key: 'updated_at' },
  ]

  return {
    createAndEditFields,
    showFields,
  }
}
