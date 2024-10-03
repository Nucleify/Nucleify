import { AxiosResponse } from 'axios'

import { ContactInterface } from 'atomic/bosons/types'

export type GetAllContactsRequestFunctionType = Promise<
    void | ContactInterface[]
>
export type GetAllContactsRequestResponseType = AxiosResponse<
    ContactInterface[]
>

export type StoreContactRequestFunctionType = (
    data: ContactInterface,
    getData: () => void,
    close: (method: string) => void
) => Promise<void>
export type EditContactRequestFunctionType = (
    data: ContactInterface,
    getData: () => void,
    close: (method: string) => void
) => Promise<void>
