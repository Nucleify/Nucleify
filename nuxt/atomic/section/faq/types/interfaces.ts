import type { QuestionObjectInterface, SiteType } from 'atomic'

export interface SectionFaqInterface {
  questions?: QuestionObjectInterface | QuestionObjectInterface[]
  site?: SiteType
}

export interface UseSplitQuestionsInterface {
  column1: QuestionObjectInterface[]
  column2: QuestionObjectInterface[]
}
