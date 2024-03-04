import { AxiosResponse } from 'axios'
import { ContactInterface, UserInterface } from "./"

export type GetAllContactsAxiosFunctionType = AxiosResponse<ContactInterface[]>
export type GetAllContactsFunctionType = Promise<ContactInterface[]>

export type GetAllUsersAxiosFunctionType = AxiosResponse<UserInterface[]>
export type GetAllUsersFunctionType = Promise<UserInterface[]>
export type GetUserAxiosFunctionType = AxiosResponse<UserInterface>
export type GetUserFunctionType = Promise<UserInterface>
