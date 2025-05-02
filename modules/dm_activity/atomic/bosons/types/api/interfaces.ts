import {
  ActivityLogInterface,
  DeleteEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
  GetAllEntitiesRequestType,
  GetEntityRequestType,
  LoadingRefType,
} from 'atomic'

export interface ActivityLogRequestsInterface {
  results: EntityResultsType<ActivityLogInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllActivities: GetAllEntitiesRequestType<ActivityLogInterface>
  getCountActivitiesByCreatedLastWeek: GetEntityRequestType
  deleteActivity: DeleteEntityRequestType
}
