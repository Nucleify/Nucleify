import { QuestionInterface, SiteQuestionCategoryType } from 'atomic'

export interface SectionFaqInterface {
  questions?: QuestionInterface | QuestionInterface[]
  site?: SiteQuestionCategoryType
}

export interface UseSplitQuestionsInterface {
  column1: QuestionInterface[]
  column2: QuestionInterface[]
}
