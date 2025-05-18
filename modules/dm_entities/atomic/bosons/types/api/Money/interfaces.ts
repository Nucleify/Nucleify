import type {
  DeleteEntityRequestType,
  EditEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
  GetAllEntitiesRequestType,
  GetEntityRequestType,
  LoadingRefType,
  MoneyObjectInterface,
  StoreEntityRequestType,
} from 'atomic'

export interface MoneyRequestsInterface {
  results: EntityResultsType<MoneyObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllMoney: GetAllEntitiesRequestType<MoneyObjectInterface>
  getCountMoneyByCreatedLastWeek: GetEntityRequestType
  storeMoney: StoreEntityRequestType<MoneyObjectInterface>
  editMoney: EditEntityRequestType<MoneyObjectInterface>
  deleteMoney: DeleteEntityRequestType
}
