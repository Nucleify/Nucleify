import { Ref } from 'vue'

import {
  DeleteEntityRequestFunctionType,
  EditEntityRequestFunctionType,
  GetAllEntitiesRequestFunctionType,
  MoneyInterface,
  MoneyResultsType,
  LoadingRefType,
  StoreEntityRequestFunctionType,
  GetEntityRequestFunctionType,
} from 'atomic'

export interface MoneyRequestsInterface {
  results: MoneyResultsType
  createdLastWeek: Ref<number>
  loading: LoadingRefType
  getAllMoney: GetAllEntitiesRequestFunctionType<MoneyInterface>
  getCountMoneyByCreatedLastWeek: GetEntityRequestFunctionType
  storeMoney: StoreEntityRequestFunctionType<MoneyInterface>
  editMoney: EditEntityRequestFunctionType<MoneyInterface>
  deleteMoney: DeleteEntityRequestFunctionType
}
