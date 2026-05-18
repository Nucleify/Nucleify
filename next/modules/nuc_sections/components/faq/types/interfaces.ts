import type { AccordionPanelInterface } from 'nucleify'

export type SiteType = string

export interface NucFaqQuestionInterface extends AccordionPanelInterface {}

export interface NucSectionFaqInterface {
  questions?: NucFaqQuestionInterface | NucFaqQuestionInterface[]
  site?: SiteType
}

export interface UseSplitQuestionsInterface {
  column1: NucFaqQuestionInterface[]
  column2: NucFaqQuestionInterface[]
}
