import type { NucFileObjectInterface } from '../object'

export type LoadingType = boolean

export type EntityResultsType<T> = T[]

export type EntityCountResultsType = number

export type GetAllEntitiesRequestType<T> = (loading?: boolean) => Promise<void>

export type GetEntityRequestType = (loading?: boolean) => Promise<void>

export type StoreEntityRequestType<T> = (
  data: T,
  getData: () => Promise<void>
) => Promise<void>

export type EditEntityRequestType<T> = (
  data: T,
  getData: () => Promise<void>
) => Promise<void>

export type DeleteEntityRequestType = (
  id: number,
  getData: () => Promise<void>
) => Promise<void>

export type CloseDialogType = () => void

// --- NucFile specific interface ---

export interface NucFileRequestsInterface {
  results: NucFileObjectInterface[]
  createdLastWeek: number
  loading: boolean
  getAllFiles: GetAllEntitiesRequestType<NucFileObjectInterface>
  getCountFilesByCreatedLastWeek: GetEntityRequestType
  storeFile: StoreEntityRequestType<NucFileObjectInterface>
  editFile: EditEntityRequestType<NucFileObjectInterface>
  deleteFile: DeleteEntityRequestType
}

// --- Fields types ---

export interface EntityFieldInterface {
  name: string
  label: string
  type?: string
}

export interface UseFieldsInterface<T> {
  createAndEditFields: readonly T[]
  showFields: readonly { label: string; key: string; name?: string }[]
}
