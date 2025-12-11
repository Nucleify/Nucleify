import type { NucQuestionObjectInterface } from 'atomic'

export interface SectionFaqInterface {
  questions?: NucQuestionObjectInterface | NucQuestionObjectInterface[]
  site?: SiteType
}

export interface UseSplitQuestionsInterface {
  column1: NucQuestionObjectInterface[]
  column2: NucQuestionObjectInterface[]
}
