export function useArticleFields() {
    const createAndEditFields = [
        { name: 'title', label: 'Title', type: 'input-text' },
        { name: 'description', label: 'Description', type: 'textarea' },
        { name: 'category', label: 'Category', type: 'input-text' },
    ]

    const showFields = [
        { label: 'Title', key: 'title' },
        { label: 'Description', key: 'description' },
        { label: 'Category', key: 'category' },
    ]

    return {
        createAndEditFields,
        showFields,
    }
}
