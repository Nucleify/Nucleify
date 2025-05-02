import type {
  ContactInterface,
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
  results: EntityResultsType<ContactInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllContacts: GetAllEntitiesRequestType<ContactInterface>
  getCountContactsByCreatedLastWeek: GetEntityRequestType
  storeContact: StoreEntityRequestType<ContactInterface>
  editContact: EditEntityRequestType<ContactInterface>
  deleteContact: DeleteEntityRequestType
}
