import type {
  ArticleInterface,
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
  results: EntityResultsType<ArticleInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllArticles: GetAllEntitiesRequestType<ArticleInterface>
  getCountArticlesByCreatedLastWeek: GetEntityRequestType
  storeArticle: StoreEntityRequestType<ArticleInterface>
  editArticle: EditEntityRequestType<ArticleInterface>
  deleteArticle: DeleteEntityRequestType
}
