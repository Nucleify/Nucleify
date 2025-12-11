import type {
  DeleteEntityRequestType,
  EditEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
  GetAllEntitiesRequestType,
  GetEntityRequestType,
  LoadingRefType,
  NucContactObjectInterface,
  StoreEntityRequestType,
} from 'atomic'

export interface NucContactRequestsInterface {
  results: EntityResultsType<NucContactObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllContacts: GetAllEntitiesRequestType<NucContactObjectInterface>
  getCountContactsByCreatedLastWeek: GetEntityRequestType
  storeContact: StoreEntityRequestType<NucContactObjectInterface>
  editContact: EditEntityRequestType<NucContactObjectInterface>
  deleteContact: DeleteEntityRequestType
}
