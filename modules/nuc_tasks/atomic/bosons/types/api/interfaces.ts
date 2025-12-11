import type {
  DeleteEntityRequestType,
  EditEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
  GetAllEntitiesRequestType,
  GetEntityRequestType,
  LoadingRefType,
  NucTaskObjectInterface,
  StoreEntityRequestType,
} from 'atomic'

export interface NucTaskRequestsInterface {
  results: EntityResultsType<NucTaskObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllTasks: GetAllEntitiesRequestType<NucTaskObjectInterface>
  getCountTasksByCreatedLastWeek: GetEntityRequestType
  storeTask: StoreEntityRequestType<NucTaskObjectInterface>
  editTask: EditEntityRequestType<NucTaskObjectInterface>
  deleteTask: DeleteEntityRequestType
}
