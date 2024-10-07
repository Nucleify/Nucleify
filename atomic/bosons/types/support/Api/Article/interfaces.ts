import {
    ArticleResultsType,
    CloseDialogFunctionType,
    DeleteEntityRequestFunctionType,
    EditArticleRequestFunctionType,
    GetAllArticlesAxiosRequestType,
    LoadingType,
    StoreArticleRequestFunctionType,
    TimeoutType,
} from 'atomic/bosons/types'

export interface ArticleRequestsInterface {
    results: ArticleResultsType
    loading: LoadingType
    close: CloseDialogFunctionType
    getAllArticles: (timeout?: TimeoutType) => GetAllArticlesAxiosRequestType
    storeArticle: StoreArticleRequestFunctionType
    editArticle: EditArticleRequestFunctionType
    deleteArticle: DeleteEntityRequestFunctionType
}
