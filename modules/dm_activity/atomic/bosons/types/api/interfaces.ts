import { Ref } from 'vue'

import {
  ActivityLogInterface,
  ActivityResultsType,
  DeleteEntityRequestFunctionType,
  GetAllEntitiesRequestFunctionType,
  GetEntityRequestFunctionType,
  LoadingRefType,
} from 'atomic'

export interface ActivityLogRequestsInterface {
  results: ActivityResultsType
  createdLastWeek: Ref<number>
  loading: LoadingRefType
  getAllActivities: GetAllEntitiesRequestFunctionType<ActivityLogInterface>
  getCountActivitiesByCreatedLastWeek: GetEntityRequestFunctionType
  deleteActivity: DeleteEntityRequestFunctionType
}
