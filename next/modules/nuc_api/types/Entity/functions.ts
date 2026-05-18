export type DeleteEntityRequestType = (
  id: number,
  getData: () => Promise<void>
) => Promise<void>

export type GetAllEntitiesRequestType<T> = (loading?: boolean) => Promise<void>

export type GetEntitiesByCategoryRequestType = (
  category: string,
  loading?: boolean
) => Promise<void>

export type GetSiteEntitiesRequestType = (
  site: string,
  loading?: boolean
) => Promise<void>

export type GetEntityRequestType<T = unknown> = () => Promise<T>

export type StoreEntityRequestType<T> = (
  data: T,
  getData: () => Promise<void>
) => Promise<void>

export type EditEntityRequestType<T> = (
  data: T,
  getData: () => Promise<void>
) => Promise<void>
