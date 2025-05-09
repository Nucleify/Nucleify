import {
  CardObjectInterface,
  DeleteEntityRequestType,
  EditEntityRequestType,
  GetAllEntitiesRequestType,
  LoadingRefType,
  StoreEntityRequestType,
  GetEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
} from 'atomic'

export interface CardRequestsInterface {
  results: EntityResultsType<CardObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllCards: GetAllEntitiesRequestType<CardObjectInterface>
  getCountCardsByCreatedLastWeek: GetEntityRequestType
  storeCard: StoreEntityRequestType<CardObjectInterface>
  editCard: EditEntityRequestType<CardObjectInterface>
  deleteCard: DeleteEntityRequestType
}
