import { QuestionInterface } from 'atomic'

export const mockQuestion: QuestionInterface = {
  id: 999,
  user_id: Number(window.sessionStorage.getItem('user_id')),
  index: Math.floor(Math.random() * 999),
  content: 'Example question?',
  answer: 'Example answer.',
  category: 'example',
}
