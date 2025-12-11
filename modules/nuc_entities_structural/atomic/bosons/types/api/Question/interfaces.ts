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
  NucQuestionObjectInterface,
  StoreEntityRequestType,
} from 'atomic'

export interface NucQuestionRequestsInterface {
  results: EntityResultsType<NucQuestionObjectInterface>
  resultsByCategory: EntityResultsType<NucQuestionObjectInterface>
  resultsBySite: EntityResultsType<NucQuestionObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllQuestions: GetAllEntitiesRequestType<NucQuestionObjectInterface>
  getQuestionsByCategory: GetEntitiesByCategoryRequestType
  getSiteQuestions: GetSiteEntitiesRequestType
  getCountQuestionsByCreatedLastWeek: GetEntityRequestType
  storeQuestion: StoreEntityRequestType<NucQuestionObjectInterface>
  editQuestion: EditEntityRequestType<NucQuestionObjectInterface>
  deleteQuestion: DeleteEntityRequestType
}
