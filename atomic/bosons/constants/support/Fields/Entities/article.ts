import { ArticleFieldInterface } from 'atomic/bosons/types'

export function useArticleFields() {
    const fieldData: readonly ArticleFieldInterface[] = [
        ['title', 'Title'],
        ['description', 'Description'],
        ['category', 'Category'],
    ] as const

    const createAndEditFields: readonly ArticleFieldInterface[] = fieldData.map(
        ([name, label]): readonly ArticleFieldInterface[] => ({
            name,
            label,
            type: name === 'description' ? 'textarea' : 'input-text',
        })
    ) as const

    const showFields: readonly ArticleFieldInterface[] = fieldData.map(
        ([key, label]): readonly ArticleFieldInterface[] => ({
            key,
            label,
        })
    ) as const

    return {
        fieldData,
        createAndEditFields,
        showFields,
    }
}
