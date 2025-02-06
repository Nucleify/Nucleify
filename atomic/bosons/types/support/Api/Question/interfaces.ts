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
} from 'atomic'

export interface QuestionRequestsInterface {
  results: QuestionResultsType
  createdLastWeek: Ref<number>
  loading: LoadingRefType
  getAllQuestions: GetAllEntitiesRequestFunctionType<QuestionInterface>
  getCountQuestionsByCreatedLastWeek: GetEntityRequestFunctionType
  storeQuestion: StoreEntityRequestFunctionType<QuestionInterface>
  editQuestion: EditEntityRequestFunctionType<QuestionInterface>
  deleteQuestion: DeleteEntityRequestFunctionType
}
