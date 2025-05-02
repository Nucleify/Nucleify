import {
  DeleteEntityRequestType,
  EditEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
  FeatureInterface,
  GetAllEntitiesRequestType,
  GetEntitiesByCategoryRequestType,
  GetEntityRequestType,
  GetSiteEntitiesRequestType,
  LoadingRefType,
  StoreEntityRequestType,
} from 'atomic'

export interface FeatureRequestsInterface {
  results: EntityResultsType<FeatureInterface>
  resultsByCategory: EntityResultsType<FeatureInterface>
  resultsBySite: EntityResultsType<FeatureInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllFeatures: GetAllEntitiesRequestType<FeatureInterface>
  getFeaturesByCategory: GetEntitiesByCategoryRequestType
  getSiteFeatures: GetSiteEntitiesRequestType
  getCountFeaturesByCreatedLastWeek: GetEntityRequestType
  storeFeature: StoreEntityRequestType<FeatureInterface>
  editFeature: EditEntityRequestType<FeatureInterface>
  deleteFeature: DeleteEntityRequestType
}
