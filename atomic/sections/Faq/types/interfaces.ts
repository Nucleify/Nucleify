import { QuestionInterface } from 'atomic'

export interface SectionFaqInterface {
  questions: QuestionInterface | QuestionInterface[]
}

export interface UseSplitQuestionsInterface {
  column1: QuestionInterface[]
  column2: QuestionInterface[]
}
