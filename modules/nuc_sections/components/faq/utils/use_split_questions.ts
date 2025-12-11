import type {
  NucQuestionObjectInterface,
  UseSplitQuestionsInterface,
} from 'atomic'

export function useSplitQuestions(
  questions: NucQuestionObjectInterface | NucQuestionObjectInterface[]
): UseSplitQuestionsInterface {
  const normalizedQuestions: NucQuestionObjectInterface[] = Array.isArray(
    questions
  )
    ? questions
    : [questions]

  const middleIndex: number = Math.ceil(normalizedQuestions.length / 2)

  const column1: NucQuestionObjectInterface[] = normalizedQuestions.slice(
    0,
    middleIndex
  )
  const column2: NucQuestionObjectInterface[] =
    normalizedQuestions.slice(middleIndex)

  return { column1, column2 }
}
