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
} from 'nucleify'

export interface NucQuestionRequestsInterface {
  results: EntityResultsType<NucQuestionObjectInterface>
  resultsByCategory: EntityResultsType<NucQuestionObjectInterface>
  resultsByLang: EntityResultsType<NucQuestionObjectInterface>
  resultsBySite: EntityResultsType<NucQuestionObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllQuestions: GetAllEntitiesRequestType<NucQuestionObjectInterface>
  getQuestionsByCategory: GetEntitiesByCategoryRequestType
  getSiteQuestions: GetSiteEntitiesRequestType
  getSiteQuestionsByLang: (
    site: SiteType,
    lang: string,
    loading?: boolean
  ) => Promise<void>
  getCountQuestionsByCreatedLastWeek: GetEntityRequestType
  storeQuestion: StoreEntityRequestType<NucQuestionObjectInterface>
  editQuestion: EditEntityRequestType<NucQuestionObjectInterface>
  deleteQuestion: DeleteEntityRequestType
}
