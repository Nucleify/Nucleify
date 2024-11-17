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

  const showFields: readonly ArticleFieldInterface[] = fieldData.map(
    ([name, label]): ArticleFieldInterface => ({
      name,
      label,
    })
  )

  return {
    createAndEditFields,
    showFields,
  }
}
