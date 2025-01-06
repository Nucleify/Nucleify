import { Ref } from 'vue'

import {
  ArticleInterface,
  ArticleResultsType,
  DeleteEntityRequestFunctionType,
  EditEntityRequestFunctionType,
  GetAllEntitiesRequestFunctionType,
  GetEntityRequestFunctionType,
  LoadingRefType,
  StoreEntityRequestFunctionType,
} from 'atomic'

export interface ArticleRequestsInterface {
  results: ArticleResultsType
  createdLastWeek: Ref<number>
  loading: LoadingRefType
  getAllArticles: GetAllEntitiesRequestFunctionType<ArticleInterface>
  getCountArticlesByCreatedLastWeek: GetEntityRequestFunctionType
  storeArticle: StoreEntityRequestFunctionType<ArticleInterface>
  editArticle: EditEntityRequestFunctionType<ArticleInterface>
  deleteArticle: DeleteEntityRequestFunctionType
}
