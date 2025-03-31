import { Ref } from 'vue'

import {
  FeatureInterface,
  FeatureResultsType,
  DeleteEntityRequestFunctionType,
  EditEntityRequestFunctionType,
  GetAllEntitiesRequestFunctionType,
  LoadingRefType,
  StoreEntityRequestFunctionType,
  GetEntityRequestFunctionType,
  SiteType,
} from 'atomic'

export interface FeatureRequestsInterface {
  results: FeatureResultsType
  resultsByCategory: FeatureResultsType
  createdLastWeek: Ref<number>
  loading: LoadingRefType
  resultsBySite: Ref<FeatureInterface[]>
  getAllFeatures: GetAllEntitiesRequestFunctionType<FeatureInterface>
  getFeaturesByCategory: (category: string) => void
  getSiteFeatures: (loading: boolean, site: SiteType) => void
  getCountFeaturesByCreatedLastWeek: GetEntityRequestFunctionType
  storeFeature: StoreEntityRequestFunctionType<FeatureInterface>
  editFeature: EditEntityRequestFunctionType<FeatureInterface>
  deleteFeature: DeleteEntityRequestFunctionType
}
