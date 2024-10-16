import {
  ArticleInterface,
  ArticleResultsType,
  CloseDialogFunctionType,
  DeleteEntityRequestFunctionType,
  EditEntityRequestFunctionType,
  GetAllEntitiesRequestFunctionType,
  LoadingType,
  StoreEntityRequestFunctionType,
} from 'atomic/bosons/types'

export interface ArticleRequestsInterface {
  results: ArticleResultsType
  loading: LoadingType
  close: CloseDialogFunctionType
  getAllArticles: GetAllEntitiesRequestFunctionType<ArticleInterface>
  storeArticle: StoreEntityRequestFunctionType<ArticleInterface>
  editArticle: EditEntityRequestFunctionType<ArticleInterface>
  deleteArticle: DeleteEntityRequestFunctionType
}
