import {
  ArticleInterface,
  ArticleResultsType,
  DeleteEntityRequestFunctionType,
  EditEntityRequestFunctionType,
  GetAllEntitiesRequestFunctionType,
  LoadingRefType,
  StoreEntityRequestFunctionType,
} from 'atomic'

export interface ArticleRequestsInterface {
  results: ArticleResultsType
  loading: LoadingRefType
  getAllArticles: GetAllEntitiesRequestFunctionType<ArticleInterface>
  storeArticle: StoreEntityRequestFunctionType<ArticleInterface>
  editArticle: EditEntityRequestFunctionType<ArticleInterface>
  deleteArticle: DeleteEntityRequestFunctionType
}
