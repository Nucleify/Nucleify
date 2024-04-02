import { AxiosResponse } from 'axios'

import { ActivityLogInterface, ContactInterface, UserInterface } from './'

export type GetAllActivitiesAxiosFunctionType = Promise<
    ActivityLogInterface[]
> | void

export type GetAllContactsAxiosFunctionType = AxiosResponse<ContactInterface[]>
export type GetAllContactsFunctionType = Promise<ContactInterface[]>

export type GetAllUsersAxiosFunctionType = AxiosResponse<UserInterface[]>
export type GetAllUsersFunctionType = Promise<void | UserInterface[]>
export type GetUserAxiosFunctionType = AxiosResponse<UserInterface>
export type GetUserFunctionType = Promise<void | UserInterface>
