import { Ref } from 'vue'

import {
  QuestionInterface,
  QuestionResultsType,
  DeleteEntityRequestFunctionType,
  EditEntityRequestFunctionType,
  GetAllEntitiesRequestFunctionType,
  LoadingRefType,
  StoreEntityRequestFunctionType,
  GetEntityRequestFunctionType,
  SiteQuestionCategoryType,
} from 'atomic'

export interface QuestionRequestsInterface {
  results: QuestionResultsType
  resultsByCategory: QuestionResultsType
  createdLastWeek: Ref<number>
  loading: LoadingRefType
  resultsBySite: Ref<QuestionInterface[]>
  getAllQuestions: GetAllEntitiesRequestFunctionType<QuestionInterface>
  getQuestionsByCategory: (category: string) => void
  getSiteQuestions: (loading: boolean, site: SiteQuestionCategoryType) => void
  getCountQuestionsByCreatedLastWeek: GetEntityRequestFunctionType
  storeQuestion: StoreEntityRequestFunctionType<QuestionInterface>
  editQuestion: EditEntityRequestFunctionType<QuestionInterface>
  deleteQuestion: DeleteEntityRequestFunctionType
}
