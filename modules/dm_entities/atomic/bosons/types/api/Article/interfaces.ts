import type {
  ArticleObjectInterface,
  DeleteEntityRequestType,
  EditEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
  GetAllEntitiesRequestType,
  GetEntityRequestType,
  LoadingRefType,
  StoreEntityRequestType,
} from 'atomic'

export interface ArticleRequestsInterface {
  results: EntityResultsType<ArticleObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllArticles: GetAllEntitiesRequestType<ArticleObjectInterface>
  getCountArticlesByCreatedLastWeek: GetEntityRequestType
  storeArticle: StoreEntityRequestType<ArticleObjectInterface>
  editArticle: EditEntityRequestType<ArticleObjectInterface>
  deleteArticle: DeleteEntityRequestType
}
