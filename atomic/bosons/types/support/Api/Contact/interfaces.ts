import {
  ContactInterface,
  ContactResultsType,
  DeleteEntityRequestType,
  EditEntityRequestFunctionType,
  GetAllEntitiesRequestFunctionType,
  LoadingType,
  StoreEntityRequestFunctionType,
} from 'atomic/bosons/types'

export interface ContactRequestsInterface {
  results: ContactResultsType
  loading: LoadingType
  getAllContacts: GetAllEntitiesRequestFunctionType<ContactInterface>
  storeContact: StoreEntityRequestFunctionType<ContactInterface>
  editContact: EditEntityRequestFunctionType<ContactInterface>
  deleteContact: DeleteEntityRequestType
}
