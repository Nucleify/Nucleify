import {
  ActivityLogInterface,
  ActivityResultsType,
  DeleteEntityRequestFunctionType,
  GetAllEntitiesRequestFunctionType,
  LoadingRefType,
} from 'atomic/bosons/types'

export interface ActivityLogRequestsInterface {
  results: ActivityResultsType
  loading: LoadingRefType
  getAllActivities: GetAllEntitiesRequestFunctionType<ActivityLogInterface>
  deleteActivity: DeleteEntityRequestFunctionType
}
