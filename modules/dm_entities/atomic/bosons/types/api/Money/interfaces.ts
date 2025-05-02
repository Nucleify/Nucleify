import type {
  DeleteEntityRequestType,
  EditEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
  GetAllEntitiesRequestType,
  GetEntityRequestType,
  LoadingRefType,
  MoneyInterface,
  StoreEntityRequestType,
} from 'atomic'

export interface MoneyRequestsInterface {
  results: EntityResultsType<MoneyInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllMoney: GetAllEntitiesRequestType<MoneyInterface>
  getCountMoneyByCreatedLastWeek: GetEntityRequestType
  storeMoney: StoreEntityRequestType<MoneyInterface>
  editMoney: EditEntityRequestType<MoneyInterface>
  deleteMoney: DeleteEntityRequestType
}
