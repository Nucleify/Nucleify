import type {
  FileObjectInterface,
  DeleteEntityRequestType,
  EditEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
  GetAllEntitiesRequestType,
  GetEntityRequestType,
  LoadingRefType,
  StoreEntityRequestType,
} from 'atomic'

export interface FileRequestsInterface {
  results: EntityResultsType<FileObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllFiles: GetAllEntitiesRequestType<FileObjectInterface>
  getCountFilesByCreatedLastWeek: GetEntityRequestType
  storeFile: StoreEntityRequestType<FileObjectInterface>
  editFile: EditEntityRequestType<FileObjectInterface>
  deleteFile: DeleteEntityRequestType
}
