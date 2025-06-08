import type { QuestionObjectInterface } from 'atomic'

export const mockQuestion: QuestionObjectInterface = {
  id: 999,
  index: Math.floor(Math.random() * 999),
  content: 'Example question?',
  answer: 'Example answer.',
  category: 'example',
  on_site: false,
  display: false,
}
