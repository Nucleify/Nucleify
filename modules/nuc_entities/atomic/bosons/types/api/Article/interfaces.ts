import type {
  DeleteEntityRequestType,
  EditEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
  GetAllEntitiesRequestType,
  GetEntityRequestType,
  LoadingRefType,
  NucArticleObjectInterface,
  StoreEntityRequestType,
} from 'atomic'

export interface NucArticleRequestsInterface {
  results: EntityResultsType<NucArticleObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllArticles: GetAllEntitiesRequestType<NucArticleObjectInterface>
  getCountArticlesByCreatedLastWeek: GetEntityRequestType
  storeArticle: StoreEntityRequestType<NucArticleObjectInterface>
  editArticle: EditEntityRequestType<NucArticleObjectInterface>
  deleteArticle: DeleteEntityRequestType
}
