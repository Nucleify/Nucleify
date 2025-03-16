import { Ref } from 'vue'

import {
  DeleteEntityRequestFunctionType,
  EditEntityRequestFunctionType,
  GetAllEntitiesRequestFunctionType,
  GetEntityRequestFunctionType,
  LoadingRefType,
  StoreEntityRequestFunctionType,
  UserInterface,
  UserResultsType,
} from 'atomic'

export interface UserRequestsInterface {
  results: UserResultsType
  createdLastWeek: Ref<number>
  loading: LoadingRefType
  getAllUsers: GetAllEntitiesRequestFunctionType<UserInterface>
  getCountUsersByCreatedLastWeek: GetEntityRequestFunctionType
  getUser: GetEntityRequestFunctionType
  storeUser: StoreEntityRequestFunctionType<UserInterface>
  editUser: EditEntityRequestFunctionType<UserInterface>
  deleteUser: DeleteEntityRequestFunctionType
}
