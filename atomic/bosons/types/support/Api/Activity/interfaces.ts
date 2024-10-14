import {
  ActivityLogInterface,
  ActivityResultsType,
  CloseDialogFunctionType,
  DeleteEntityRequestFunctionType,
  GetAllEntitiesRequestFunctionType,
  LoadingType,
} from 'atomic/bosons/types'

export interface ActivityLogRequestsInterface {
  results: ActivityResultsType
  loading: LoadingType
  close: CloseDialogFunctionType
  getAllActivities: GetAllEntitiesRequestFunctionType<ActivityLogInterface>
  deleteActivity: DeleteEntityRequestFunctionType
}
