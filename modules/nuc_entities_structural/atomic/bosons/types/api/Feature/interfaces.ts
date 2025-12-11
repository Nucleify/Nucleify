import type {
  DeleteEntityRequestType,
  EditEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
  GetAllEntitiesRequestType,
  GetEntitiesByCategoryRequestType,
  GetEntityRequestType,
  GetSiteEntitiesRequestType,
  LoadingRefType,
  NucFeatureObjectInterface,
  StoreEntityRequestType,
} from 'atomic'

export interface NucFeatureRequestsInterface {
  results: EntityResultsType<NucFeatureObjectInterface>
  resultsByCategory: EntityResultsType<NucFeatureObjectInterface>
  resultsBySite: EntityResultsType<NucFeatureObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllFeatures: GetAllEntitiesRequestType<NucFeatureObjectInterface>
  getFeaturesByCategory: GetEntitiesByCategoryRequestType
  getSiteFeatures: GetSiteEntitiesRequestType
  getCountFeaturesByCreatedLastWeek: GetEntityRequestType
  storeFeature: StoreEntityRequestType<NucFeatureObjectInterface>
  editFeature: EditEntityRequestType<NucFeatureObjectInterface>
  deleteFeature: DeleteEntityRequestType
}
