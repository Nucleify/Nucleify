import { QuestionInterface } from '../../../bosons/types/support/Entities/Question/interfaces'

export interface SectionFaqInterface {
  questions: QuestionInterface | QuestionInterface[]
}

export interface UseSplitQuestionsInterface {
  column1: QuestionInterface[]
  column2: QuestionInterface[]
}
