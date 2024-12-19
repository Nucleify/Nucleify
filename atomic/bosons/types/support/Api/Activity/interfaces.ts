import {
  ActivityLogInterface,
  ActivityResultsType,
  DeleteEntityRequestFunctionType,
  GetAllEntitiesRequestFunctionType,
  LoadingRefType,
} from 'atomic'

export interface ActivityLogRequestsInterface {
  results: ActivityResultsType
  loading: LoadingRefType
  getAllActivities: GetAllEntitiesRequestFunctionType<ActivityLogInterface>
  deleteActivity: DeleteEntityRequestFunctionType
}
