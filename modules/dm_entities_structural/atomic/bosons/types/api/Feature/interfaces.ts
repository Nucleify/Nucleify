import type {
  DeleteEntityRequestType,
  EditEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
  FeatureObjectInterface,
  GetAllEntitiesRequestType,
  GetEntitiesByCategoryRequestType,
  GetEntityRequestType,
  GetSiteEntitiesRequestType,
  LoadingRefType,
  StoreEntityRequestType,
} from 'atomic'

export interface FeatureRequestsInterface {
  results: EntityResultsType<FeatureObjectInterface>
  resultsByCategory: EntityResultsType<FeatureObjectInterface>
  resultsBySite: EntityResultsType<FeatureObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllFeatures: GetAllEntitiesRequestType<FeatureObjectInterface>
  getFeaturesByCategory: GetEntitiesByCategoryRequestType
  getSiteFeatures: GetSiteEntitiesRequestType
  getCountFeaturesByCreatedLastWeek: GetEntityRequestType
  storeFeature: StoreEntityRequestType<FeatureObjectInterface>
  editFeature: EditEntityRequestType<FeatureObjectInterface>
  deleteFeature: DeleteEntityRequestType
}
