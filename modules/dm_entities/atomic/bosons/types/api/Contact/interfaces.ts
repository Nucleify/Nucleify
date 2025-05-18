import type {
  ContactObjectInterface,
  DeleteEntityRequestType,
  EditEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
  GetAllEntitiesRequestType,
  GetEntityRequestType,
  LoadingRefType,
  StoreEntityRequestType,
} from 'atomic'

export interface ContactRequestsInterface {
  results: EntityResultsType<ContactObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllContacts: GetAllEntitiesRequestType<ContactObjectInterface>
  getCountContactsByCreatedLastWeek: GetEntityRequestType
  storeContact: StoreEntityRequestType<ContactObjectInterface>
  editContact: EditEntityRequestType<ContactObjectInterface>
  deleteContact: DeleteEntityRequestType
}
