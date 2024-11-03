import {
  ActivityLogInterface,
  ActivityResultsType,
  CloseDialogFunctionType,
  DeleteEntityRequestFunctionType,
  GetAllEntitiesRequestFunctionType,
  LoadingRefType,
} from 'atomic/bosons/types'

export interface ActivityLogRequestsInterface {
  results: ActivityResultsType
  loading: LoadingRefType
  close: CloseDialogFunctionType
  getAllActivities: GetAllEntitiesRequestFunctionType<ActivityLogInterface>
  deleteActivity: DeleteEntityRequestFunctionType
}
