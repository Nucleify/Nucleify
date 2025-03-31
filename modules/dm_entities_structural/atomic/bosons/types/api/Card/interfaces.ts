import { Ref } from 'vue'

import {
  StructuralCardInterface,
  CardResultsType,
  DeleteEntityRequestFunctionType,
  EditEntityRequestFunctionType,
  GetAllEntitiesRequestFunctionType,
  LoadingRefType,
  StoreEntityRequestFunctionType,
  GetEntityRequestFunctionType,
} from 'atomic'

export interface CardRequestsInterface {
  results: CardResultsType
  createdLastWeek: Ref<number>
  loading: LoadingRefType
  getAllCards: GetAllEntitiesRequestFunctionType<StructuralCardInterface>
  getCountCardsByCreatedLastWeek: GetEntityRequestFunctionType
  storeCard: StoreEntityRequestFunctionType<StructuralCardInterface>
  editCard: EditEntityRequestFunctionType<StructuralCardInterface>
  deleteCard: DeleteEntityRequestFunctionType
}
