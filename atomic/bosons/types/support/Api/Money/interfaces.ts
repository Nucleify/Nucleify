import {
  DeleteEntityRequestFunctionType,
  EditEntityRequestFunctionType,
  GetAllEntitiesRequestFunctionType,
  MoneyInterface,
  MoneyResultsType,
  LoadingRefType,
  StoreEntityRequestFunctionType,
} from 'atomic/bosons/types'

export interface MoneyRequestsInterface {
  results: MoneyResultsType
  loading: LoadingRefType
  getAllMoney: GetAllEntitiesRequestFunctionType<MoneyInterface>
  storeMoney: StoreEntityRequestFunctionType<MoneyInterface>
  editMoney: EditEntityRequestFunctionType<MoneyInterface>
  deleteMoney: DeleteEntityRequestFunctionType
}
