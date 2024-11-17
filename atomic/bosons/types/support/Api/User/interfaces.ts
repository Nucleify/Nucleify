import {
  DeleteEntityRequestFunctionType,
  EditEntityRequestFunctionType,
  GetAllEntitiesRequestFunctionType,
  GetEntityRequestFunctionType,
  LoadingRefType,
  StoreEntityRequestFunctionType,
  UserInterface,
  UserResultsType,
} from 'atomic/bosons/types'

export interface UserRequestsInterface {
  results: UserResultsType
  loading: LoadingRefType
  getAllUsers: GetAllEntitiesRequestFunctionType<UserInterface>
  getUser: GetEntityRequestFunctionType
  storeUser: StoreEntityRequestFunctionType<UserInterface>
  editUser: EditEntityRequestFunctionType<UserInterface>
  deleteUser: DeleteEntityRequestFunctionType
}
