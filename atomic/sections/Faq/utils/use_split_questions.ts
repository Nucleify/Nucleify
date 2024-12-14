import { QuestionInterface, UseSplitQuestionsInterface } from 'atomic'

export function useSplitQuestions(
  questions: QuestionInterface | QuestionInterface[]
): UseSplitQuestionsInterface {
  const normalizedQuestions: QuestionInterface[] = Array.isArray(questions)
    ? questions
    : [questions]

  const middleIndex: number = Math.ceil(normalizedQuestions.length / 2)

  const column1: QuestionInterface[] = normalizedQuestions.slice(0, middleIndex)
  const column2: QuestionInterface[] = normalizedQuestions.slice(middleIndex)

  return { column1, column2 }
}
