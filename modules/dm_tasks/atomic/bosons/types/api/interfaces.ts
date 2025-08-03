import type {
  DeleteEntityRequestType,
  EditEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
  GetAllEntitiesRequestType,
  GetEntityRequestType,
  LoadingRefType,
  StoreEntityRequestType,
  TaskObjectInterface,
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
