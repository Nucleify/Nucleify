export interface SectionFaqInterface {
  questions: QuestionInterface | QuestionInterface[]
}

export interface QuestionInterface {
  value: number
  header: string
  content: string
}

export interface UseSplitQuestionsInterface {
  column1: QuestionInterface[]
  column2: QuestionInterface[]
}
