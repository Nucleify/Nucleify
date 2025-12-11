import type { NucQuestionObjectInterface } from 'atomic'

export const mockQuestion: NucQuestionObjectInterface = {
  id: 999,
  index: Math.floor(Math.random() * 999),
  content: 'Example question?',
  answer: 'Example answer.',
  category: 'example',
  on_site: false,
  display: false,
}
