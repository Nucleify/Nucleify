import type {
  CardObjectInterface,
  DeleteEntityRequestType,
  EditEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
  GetAllEntitiesRequestType,
  GetEntityRequestType,
  LoadingRefType,
  StoreEntityRequestType,
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
