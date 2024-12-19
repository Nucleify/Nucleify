import {
  ContactInterface,
  ContactResultsType,
  DeleteEntityRequestFunctionType,
  EditEntityRequestFunctionType,
  GetAllEntitiesRequestFunctionType,
  LoadingRefType,
  StoreEntityRequestFunctionType,
} from 'atomic'

export interface ContactRequestsInterface {
  results: ContactResultsType
  loading: LoadingRefType
  getAllContacts: GetAllEntitiesRequestFunctionType<ContactInterface>
  storeContact: StoreEntityRequestFunctionType<ContactInterface>
  editContact: EditEntityRequestFunctionType<ContactInterface>
  deleteContact: DeleteEntityRequestFunctionType
}
