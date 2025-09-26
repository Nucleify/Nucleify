import type {
  QuestionObjectInterface,
  UseSplitQuestionsInterface,
} from 'atomic'

export function useSplitQuestions(
  questions: QuestionObjectInterface | QuestionObjectInterface[]
): UseSplitQuestionsInterface {
  const normalizedQuestions: QuestionObjectInterface[] = Array.isArray(
    questions
  )
    ? questions
    : [questions]

  const middleIndex: number = Math.ceil(normalizedQuestions.length / 2)

  const column1: QuestionObjectInterface[] = normalizedQuestions.slice(
    0,
    middleIndex
  )
  const column2: QuestionObjectInterface[] =
    normalizedQuestions.slice(middleIndex)

  return { column1, column2 }
}
