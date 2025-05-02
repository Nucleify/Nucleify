import type {
  DeleteEntityRequestType,
  EditEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
  GetAllEntitiesRequestType,
  GetEntitiesByCategoryRequestType,
  GetEntityRequestType,
  GetSiteEntitiesRequestType,
  LoadingRefType,
  QuestionInterface,
  StoreEntityRequestType,
} from 'atomic'

export interface QuestionRequestsInterface {
  results: EntityResultsType<QuestionInterface>
  resultsByCategory: EntityResultsType<QuestionInterface>
  resultsBySite: EntityResultsType<QuestionInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllQuestions: GetAllEntitiesRequestType<QuestionInterface>
  getQuestionsByCategory: GetEntitiesByCategoryRequestType
  getSiteQuestions: GetSiteEntitiesRequestType
  getCountQuestionsByCreatedLastWeek: GetEntityRequestType
  storeQuestion: StoreEntityRequestType<QuestionInterface>
  editQuestion: EditEntityRequestType<QuestionInterface>
  deleteQuestion: DeleteEntityRequestType
}
