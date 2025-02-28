import { ArticleInterface } from 'atomic'

export const mockArticle: ArticleInterface = {
  id: 999999,
  user_id: Number(window.sessionStorage.getItem('user_id')),
  title: 'Example Article',
  description: 'Example Description',
  category: 'example',
}
