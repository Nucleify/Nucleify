import type {
  ActivityLogObjectInterface,
  DeleteEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
  GetAllEntitiesRequestType,
  GetEntityRequestType,
  LoadingRefType,
} from 'atomic'

export interface ActivityLogRequestsInterface {
  results: EntityResultsType<ActivityLogObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllActivities: GetAllEntitiesRequestType<ActivityLogObjectInterface>
  getCountActivitiesByCreatedLastWeek: GetEntityRequestType
  deleteActivity: DeleteEntityRequestType
}
