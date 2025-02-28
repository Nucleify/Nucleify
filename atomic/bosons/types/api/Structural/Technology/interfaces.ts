import { Ref } from 'vue'

import {
  TechnologyInterface,
  TechnologyResultsType,
  DeleteEntityRequestFunctionType,
  EditEntityRequestFunctionType,
  GetAllEntitiesRequestFunctionType,
  LoadingRefType,
  StoreEntityRequestFunctionType,
  GetEntityRequestFunctionType,
  SiteType,
} from 'atomic'

export interface TechnologyRequestsInterface {
  results: TechnologyResultsType
  resultsByCategory: TechnologyResultsType
  createdLastWeek: Ref<number>
  loading: LoadingRefType
  resultsBySite: Ref<TechnologyInterface[]>
  getAllTechnologies: GetAllEntitiesRequestFunctionType<TechnologyInterface>
  getTechnologiesByCategory: (category: string) => void
  getSiteTechnologies: (loading: boolean, site: SiteType) => void
  getCountTechnologiesByCreatedLastWeek: GetEntityRequestFunctionType
  storeTechnology: StoreEntityRequestFunctionType<TechnologyInterface>
  editTechnology: EditEntityRequestFunctionType<TechnologyInterface>
  deleteTechnology: DeleteEntityRequestFunctionType
}
