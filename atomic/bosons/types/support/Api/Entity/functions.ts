import { AxiosResponse } from 'axios'

export type DeleteEntityRequestFunctionType = (
    id: number,
    getData: () => void
) => Promise<void>

export type GetAllEntitiesRequestFunctionType<T> = (
    loading?: boolean
) => Promise<void | T[]>

export type GetAllEntitiesRequestResponseType<T> = AxiosResponse<T[]>

export type GetEntityRequestFunctionType<T> = Promise<void | T>

export type StoreEntityRequestFunctionType<T> = (
    data: T,
    getData: () => void
) => Promise<void>

export type EditEntityRequestFunctionType<T> = (
    data: T,
    getData: () => void
) => Promise<void>
