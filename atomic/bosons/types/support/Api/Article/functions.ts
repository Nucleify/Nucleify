import { AxiosResponse } from 'axios'

import { ArticleInterface } from 'atomic/bosons/types'

export type GetAllArticlesFunctionType = Promise<void | ArticleInterface[]>
export type GetAllArticlesRequestResponseType = AxiosResponse<
    ArticleInterface[]
>

export type StoreArticleRequestFunctionType = (
    data: ArticleInterface
) => Promise<void>
export type EditArticleRequestFunctionType = (
    data: ArticleInterface
) => Promise<void>
