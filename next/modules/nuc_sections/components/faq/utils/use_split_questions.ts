import type {
  NucFaqQuestionInterface,
  UseSplitQuestionsInterface,
} from '../types/interfaces'

export function useSplitQuestions(
  questions: NucFaqQuestionInterface | NucFaqQuestionInterface[]
): UseSplitQuestionsInterface {
  const normalizedQuestions: NucFaqQuestionInterface[] = Array.isArray(
    questions
  )
    ? questions
    : [questions]

  const middleIndex: number = Math.ceil(normalizedQuestions.length / 2)

  const column1: NucFaqQuestionInterface[] = normalizedQuestions.slice(
    0,
    middleIndex
  )
  const column2: NucFaqQuestionInterface[] =
    normalizedQuestions.slice(middleIndex)

  return { column1, column2 }
}
