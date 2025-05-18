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
  QuestionObjectInterface,
  StoreEntityRequestType,
} from 'atomic'

export interface QuestionRequestsInterface {
  results: EntityResultsType<QuestionObjectInterface>
  resultsByCategory: EntityResultsType<QuestionObjectInterface>
  resultsBySite: EntityResultsType<QuestionObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllQuestions: GetAllEntitiesRequestType<QuestionObjectInterface>
  getQuestionsByCategory: GetEntitiesByCategoryRequestType
  getSiteQuestions: GetSiteEntitiesRequestType
  getCountQuestionsByCreatedLastWeek: GetEntityRequestType
  storeQuestion: StoreEntityRequestType<QuestionObjectInterface>
  editQuestion: EditEntityRequestType<QuestionObjectInterface>
  deleteQuestion: DeleteEntityRequestType
}
