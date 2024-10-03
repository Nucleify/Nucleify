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
    UserIdType,
} from 'atomic/bosons/types'
import { useApiErrors, useLoading, useToast } from 'atomic/bosons/utils'

export function articleRequests(): ArticleRequestsInterface {
    const results: ArticleResultsType = ref([])
    const { loading, setLoading } = useLoading()

    const { apiErrors }: { apiErrors: ApiErrorsFunctionType } = useApiErrors()
    const { flashToast }: { flashToast: FlashToastFunctionType } = useToast()

    async function getAllArticles(
        timeout?: number
    ): GetAllArticlesFunctionType {
        setLoading(true)

        return await axios
            .get('/api/articles')
            .then((response: GetAllArticlesRequestResponseType) => {
                if (timeout) {
                    setTimeout((): void => {
                        results.value = response.data
                    }, timeout)
                } else {
                    results.value = response.data
                }
            })
            .catch((error): void => {
                if (timeout) {
                    setTimeout((): void => {
                        apiErrors(error)
                    }, timeout)
                } else {
                    apiErrors(error)
                }
            })
            .finally((): void => {
                if (timeout) {
                    setLoading(false, timeout)
                } else {
                    setLoading(false)
                }
            })
    }

    async function storeArticle(
        data: ArticleInterface,
        getData: () => void,
        close: (method: string) => void
    ): StoreArticleRequestFunctionType {
        const user_id: UserIdType = window.sessionStorage.getItem('user_id')

        return await axios
            .post('/api/articles', {
                user_id: user_id,
                title: data.title,
                description: data.description,
                category: data.category,
            })
            .then((response: AxiosResponse): void => {
                getData()
                close('create')

                flashToast(response.data.message, 'success')
            })
            .catch((error): void => {
                apiErrors(error)
            })
    }

    async function editArticle(
        data: ArticleInterface,
        getData: () => void,
        close: (method: string) => void
    ): EditArticleRequestFunctionType {
        return await axios
            .put('/api/articles/' + data.id, {
                title: data.title,
                description: data.description,
                category: data.category,
            })
            .then((response: AxiosResponse): void => {
                getData()
                close('edit')

                flashToast(response.data.message, 'success')
            })
            .catch((error): void => {
                apiErrors(error)
            })
    }

    async function deleteArticle(
        id: number,
        getData: () => void,
        close: (method: string) => void
    ): DeleteEntityRequestFunctionType {
        return await axios
            .delete(`/api/articles/${id}`)
            .then((response: AxiosResponse): void => {
                getData()
                close('delete')

                flashToast(response.data.message, 'success')
            })
            .catch((error): void => {
                apiErrors(error)
            })
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
