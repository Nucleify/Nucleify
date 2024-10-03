import { AxiosResponse } from 'axios'

import { ArticleInterface } from 'atomic/bosons/types'

export type GetAllArticlesFunctionType = Promise<void | ArticleInterface[]>
export type GetAllArticlesRequestResponseType = AxiosResponse<
    ArticleInterface[]
>

export type StoreArticleRequestFunctionType = (
    data: ArticleInterface,
    getData: () => void,
    close: (method: string) => void
) => Promise<void>
export type EditArticleRequestFunctionType = (
    data: ArticleInterface,
    getData: () => void,
    close: (method: string) => void
) => Promise<void>
