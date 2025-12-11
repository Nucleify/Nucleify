import type {
  DeleteEntityRequestType,
  EditEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
  GetAllEntitiesRequestType,
  GetEntityRequestType,
  LoadingRefType,
  NucUserObjectInterface,
  StoreEntityRequestType,
} from 'atomic'

export interface NucUserRequestsInterface {
  results: EntityResultsType<NucUserObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllUsers: GetAllEntitiesRequestType<NucUserObjectInterface>
  getCountUsersByCreatedLastWeek: GetEntityRequestType
  getUser: GetAllEntitiesRequestType<NucUserObjectInterface>
  storeUser: StoreEntityRequestType<NucUserObjectInterface>
  editUser: EditEntityRequestType<NucUserObjectInterface>
  deleteUser: DeleteEntityRequestType
}
