import {
  DeleteEntityRequestFunctionType,
  EditEntityRequestFunctionType,
  GetAllEntitiesRequestFunctionType,
  MoneyInterface,
  MoneyResultsType,
  LoadingRefType,
  StoreEntityRequestFunctionType,
} from 'atomic'

export interface MoneyRequestsInterface {
  results: MoneyResultsType
  loading: LoadingRefType
  getAllMoney: GetAllEntitiesRequestFunctionType<MoneyInterface>
  storeMoney: StoreEntityRequestFunctionType<MoneyInterface>
  editMoney: EditEntityRequestFunctionType<MoneyInterface>
  deleteMoney: DeleteEntityRequestFunctionType
}
