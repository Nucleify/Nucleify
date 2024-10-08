import { ref } from 'vue'
import axios, { AxiosResponse } from 'axios'

import {
    ApiErrorsFunctionType,
    ArticleInterface,
    ArticleResultsType,
    ArticleRequestsInterface,
    DeleteEntityRequestFunctionType,
    EditArticleRequestFunctionType,
    FlashToastFunctionType,
    GetAllArticlesFunctionType,
    GetAllArticlesRequestResponseType,
    StoreArticleRequestFunctionType,
    CloseDialogFunctionType,
} from 'atomic/bosons/types'
import {
    apiSuccess,
    useApiErrors,
    useLoading,
    useToast,
} from 'atomic/bosons/utils'

export function articleRequests(
    close: CloseDialogFunctionType
): ArticleRequestsInterface {
    const results: ArticleResultsType = ref([])

    const { loading } = useLoading()
    const { apiErrors }: { apiErrors: ApiErrorsFunctionType } = useApiErrors()
    const { flashToast }: { flashToast: FlashToastFunctionType } = useToast()

    async function getAllArticles(
        timeout?: number
    ): GetAllArticlesFunctionType {
        try {
            const response: GetAllArticlesRequestResponseType =
                await axios.get('/api/articles')

            timeout
                ? setTimeout((results.value = response.data), timeout)
                : (results.value = response.data)
        } catch (error) {
            apiErrors(error)
        }
    }

    async function storeArticle(
        data: ArticleInterface
    ): StoreArticleRequestFunctionType {
        try {
            const response: AxiosResponse = await axios.post('/api/articles', {
                user_id: window.sessionStorage.getItem('user_id'),
                title: data.title,
                description: data.description,
                category: data.category,
            })

            await apiSuccess(
                response,
                getAllArticles,
                flashToast,
                close,
                'create'
            )
        } catch (error) {
            apiErrors(error)
        }
    }

    async function editArticle(
        article: ArticleInterface
    ): EditArticleRequestFunctionType {
        try {
            const response: AxiosResponse = await axios.put(
                `/api/articles/${article.id}`,
                {
                    title: article.title,
                    description: article.description,
                    category: article.category,
                }
            )

            await apiSuccess(
                response,
                getAllArticles,
                flashToast,
                close,
                'edit'
            )
        } catch (error) {
            apiErrors(error)
        }
    }

    async function deleteArticle(id: number): DeleteEntityRequestFunctionType {
        try {
            const response: AxiosResponse = await axios.delete(
                `/api/articles/${id}`
            )

            await apiSuccess(
                response,
                getAllArticles,
                flashToast,
                close,
                'delete'
            )
        } catch (error) {
            apiErrors(error)
        }
    }

    return {
        results,
        loading,
        getAllArticles,
        storeArticle,
        editArticle,
        deleteArticle,
    }
}
