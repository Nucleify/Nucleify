import type { SiteType } from 'atomic'

export type DeleteEntityRequestType = (
  id: number,
  getData: () => Promise<void>
) => Promise<void>

export type GetAllEntitiesRequestType<T> = (
  loading?: boolean
) => Promise<T[] | undefined>

export type GetEntitiesByCategoryRequestType = (
  category: string,
  loading?: boolean
) => Promise<void>

export type GetSiteEntitiesRequestType = (
  site: SiteType,
  loading?: boolean
) => Promise<void>

export type GetEntityRequestType = () => Promise<void>

export type StoreEntityRequestType<T> = (
  data: T,
  getData: () => Promise<void>
) => Promise<void>

export type EditEntityRequestType<T> = (
  data: T,
  getData: () => Promise<void>
) => Promise<void>
