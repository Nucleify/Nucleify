import { AxiosResponse } from 'axios'

import { ActivityLogInterface, ArticleInterface } from 'atomic/bosons/types'

export type GetAllActivitiesRequestFunctionType = Promise<
    void | ActivityLogInterface[]
>
export type GetAllArticlesRequestResponseType = AxiosResponse<
    ArticleInterface[]
>
