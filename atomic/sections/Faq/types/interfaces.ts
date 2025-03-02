import { QuestionInterface, SiteType } from 'atomic'

export interface SectionFaqInterface {
  questions?: QuestionInterface | QuestionInterface[]
  site?: SiteType
}

export interface UseSplitQuestionsInterface {
  column1: QuestionInterface[]
  column2: QuestionInterface[]
}
