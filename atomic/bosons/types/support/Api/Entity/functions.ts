import { AxiosResponse } from 'axios'

export type DeleteEntityRequestFunctionType = (
  id: number,
  getData: () => Promise<void>
) => Promise<void>

export type GetAllEntitiesRequestFunctionType<T> = (
  loading?: boolean
) => Promise<void | T[]>

export type GetAllEntitiesRequestResponseType<T> = AxiosResponse<T[]>

export type GetEntityRequestFunctionType = () => Promise<void>

export type StoreEntityRequestFunctionType<T> = (
  data: T,
  getData: () => Promise<void>
) => Promise<void>

export type EditEntityRequestFunctionType<T> = (
  data: T,
  getData: () => Promise<void>
) => Promise<void>
