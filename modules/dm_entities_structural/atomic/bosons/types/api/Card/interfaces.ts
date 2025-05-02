import {
  StructuralCardInterface,
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
  results: EntityResultsType<StructuralCardInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllCards: GetAllEntitiesRequestType<StructuralCardInterface>
  getCountCardsByCreatedLastWeek: GetEntityRequestType
  storeCard: StoreEntityRequestType<StructuralCardInterface>
  editCard: EditEntityRequestType<StructuralCardInterface>
  deleteCard: DeleteEntityRequestType
}
