import type {
  DeleteEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
  GetAllEntitiesRequestType,
  GetEntityRequestType,
  LoadingRefType,
  NucActivityObjectInterface,
} from 'atomic'

export interface NucActivityRequestsInterface {
  results: EntityResultsType<NucActivityObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllActivities: GetAllEntitiesRequestType<NucActivityObjectInterface>
  getCountActivitiesByCreatedLastWeek: GetEntityRequestType
  deleteActivity: DeleteEntityRequestType
}
