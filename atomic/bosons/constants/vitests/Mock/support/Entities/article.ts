import { ArticleInterface } from 'atomic/bosons/types'

export const mockArticle: ArticleInterface = {
    id: 999999,
    user_id: window.sessionStorage.getItem('user_id'),
    title: 'Example Article',
    description: 'Example Description',
    category: 'example',
}
