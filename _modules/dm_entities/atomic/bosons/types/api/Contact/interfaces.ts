import { Ref } from 'vue'

import {
  ContactInterface,
  ContactResultsType,
  DeleteEntityRequestFunctionType,
  EditEntityRequestFunctionType,
  GetAllEntitiesRequestFunctionType,
  GetEntityRequestFunctionType,
  LoadingRefType,
  StoreEntityRequestFunctionType,
} from 'atomic'

export interface ContactRequestsInterface {
  results: ContactResultsType
  createdLastWeek: Ref<number>
  loading: LoadingRefType
  getAllContacts: GetAllEntitiesRequestFunctionType<ContactInterface>
  getCountContactsByCreatedLastWeek: GetEntityRequestFunctionType
  storeContact: StoreEntityRequestFunctionType<ContactInterface>
  editContact: EditEntityRequestFunctionType<ContactInterface>
  deleteContact: DeleteEntityRequestFunctionType
}
