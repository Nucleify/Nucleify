import axios, { AxiosResponse } from 'axios'
import { ref } from 'vue'

import {
    ArticleApiMethodsInterface,
    GetAllArticlesAxiosFunctionType,
    GetAllArticlesFunctionType,
    ArticleResultsType,
    ArticleInterface,
    UserIdType,
    ApiErrorsFunctionType,
    FlashToastFunctionType,
} from '@/types'
import { useApiErrors, useFlashToast } from '@/utils'

export default function articleApiMethods(): ArticleApiMethodsInterface {
    const results: ArticleResultsType = ref([])

    const { apiErrors }: { apiErrors: ApiErrorsFunctionType } = useApiErrors()
    const { flashToast }: { flashToast: FlashToastFunctionType } =
        useFlashToast()

    async function getAllArticles(): GetAllArticlesFunctionType {
        return await axios
            .get('/api/articles')
            .then((response: GetAllArticlesAxiosFunctionType) => {
                return (results.value = response.data)
            })
            .catch((error): void => {
                apiErrors(error)
                throw error
            })
    }

    async function storeArticle(
        data: ArticleInterface,
        getData: () => void,
        close: (method: string) => void
    ): Promise<void> {
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
    ): Promise<void> {
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
    ): Promise<void> {
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

    return { results, getAllArticles, storeArticle, editArticle, deleteArticle }
}
