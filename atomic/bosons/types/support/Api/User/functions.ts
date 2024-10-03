import { AxiosResponse } from 'axios'

import { UserInterface } from 'atomic/bosons/types'

export type GetAllUsersRequestFunctionType = Promise<void | UserInterface[]>
export type GetAllUsersRequestResponseType = AxiosResponse<UserInterface[]>

export type GetUserRequestFunctionType = Promise<void | UserInterface>
export type GetUserRequestResponseType = AxiosResponse<UserInterface>

export type StoreUserRequestFunctionType = (
    data: UserInterface,
    getData: () => void,
    close: (method: string) => void
) => Promise<void>
export type EditUserRequestFunctionType = (
    data: UserInterface,
    getData: () => void,
    close: (method: string) => void
) => Promise<void>
