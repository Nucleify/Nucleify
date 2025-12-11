import type {
  DeleteEntityRequestType,
  EditEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
  GetAllEntitiesRequestType,
  GetEntityRequestType,
  LoadingRefType,
  NucCardObjectInterface,
  StoreEntityRequestType,
} from 'atomic'

export interface NucCardRequestsInterface {
  results: EntityResultsType<NucCardObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllCards: GetAllEntitiesRequestType<NucCardObjectInterface>
  getCountCardsByCreatedLastWeek: GetEntityRequestType
  storeCard: StoreEntityRequestType<NucCardObjectInterface>
  editCard: EditEntityRequestType<NucCardObjectInterface>
  deleteCard: DeleteEntityRequestType
}
