import type {
  DeleteEntityRequestType,
  EditEntityRequestType,
  EntityResultsType,
  EntityCountResultsType,
  GetAllEntitiesRequestType,
  GetEntityRequestType,
  LoadingRefType,
  StoreEntityRequestType,
  UserInterface,
} from 'atomic'

export interface UserRequestsInterface {
  results: EntityResultsType<UserInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllUsers: GetAllEntitiesRequestType<UserInterface>
  getCountUsersByCreatedLastWeek: GetEntityRequestType
  getUser: GetEntityRequestType<UserInterface>
  storeUser: StoreEntityRequestType<UserInterface>
  editUser: EditEntityRequestType<UserInterface>
  deleteUser: DeleteEntityRequestType
}
