import type {
  DeleteEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
  GetAllEntitiesRequestType,
  GetEntityRequestType,
  LoadingRefType,
  NucActivityObjectInterface,
} from 'nucleify'

export interface NucActivityRequestsInterface {
  results: EntityResultsType<NucActivityObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllActivities: GetAllEntitiesRequestType<NucActivityObjectInterface>
  getCountActivitiesByCreatedLastWeek: GetEntityRequestType
  deleteActivity: DeleteEntityRequestType
}
