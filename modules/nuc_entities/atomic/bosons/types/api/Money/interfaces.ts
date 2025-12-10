import type {
  DeleteEntityRequestType,
  EditEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
  GetAllEntitiesRequestType,
  GetEntityRequestType,
  LoadingRefType,
  NucMoneyObjectInterface,
  StoreEntityRequestType,
} from 'atomic'

export interface NucMoneyRequestsInterface {
  results: EntityResultsType<NucMoneyObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllMoney: GetAllEntitiesRequestType<NucMoneyObjectInterface>
  getCountMoneyByCreatedLastWeek: GetEntityRequestType
  storeMoney: StoreEntityRequestType<NucMoneyObjectInterface>
  editMoney: EditEntityRequestType<NucMoneyObjectInterface>
  deleteMoney: DeleteEntityRequestType
}
