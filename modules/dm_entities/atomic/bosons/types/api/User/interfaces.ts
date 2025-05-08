import type {
  DeleteEntityRequestType,
  EditEntityRequestType,
  EntityResultsType,
  EntityCountResultsType,
  GetAllEntitiesRequestType,
  GetEntityRequestType,
  LoadingRefType,
  StoreEntityRequestType,
  UserObjectInterface,
} from 'atomic'

export interface UserRequestsInterface {
  results: EntityResultsType<UserObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllUsers: GetAllEntitiesRequestType<UserObjectInterface>
  getCountUsersByCreatedLastWeek: GetEntityRequestType
  getUser: GetEntityRequestType<UserObjectInterface>
  storeUser: StoreEntityRequestType<UserObjectInterface>
  editUser: EditEntityRequestType<UserObjectInterface>
  deleteUser: DeleteEntityRequestType
}
