import type {
  TaskObjectInterface,
  DeleteEntityRequestType,
  EditEntityRequestType,
  GetAllEntitiesRequestType,
  LoadingRefType,
  StoreEntityRequestType,
  GetEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
} from 'atomic'

export interface TaskRequestsInterface {
  results: EntityResultsType<TaskObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllTasks: GetAllEntitiesRequestType<TaskObjectInterface>
  getCountTasksByCreatedLastWeek: GetEntityRequestType
  storeTask: StoreEntityRequestType<TaskObjectInterface>
  editTask: EditEntityRequestType<TaskObjectInterface>
  deleteTask: DeleteEntityRequestType
}
