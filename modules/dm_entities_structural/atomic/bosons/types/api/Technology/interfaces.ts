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
  StoreEntityRequestType,
  TechnologyInterface,
} from 'atomic'

export interface TechnologyRequestsInterface {
  results: EntityResultsType<TechnologyInterface>
  resultsByCategory: EntityResultsType<TechnologyInterface>
  resultsBySite: EntityResultsType<TechnologyInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllTechnologies: GetAllEntitiesRequestType<TechnologyInterface>
  getTechnologiesByCategory: GetEntitiesByCategoryRequestType
  getSiteTechnologies: GetSiteEntitiesRequestType
  getCountTechnologiesByCreatedLastWeek: GetEntityRequestType
  storeTechnology: StoreEntityRequestType<TechnologyInterface>
  editTechnology: EditEntityRequestType<TechnologyInterface>
  deleteTechnology: DeleteEntityRequestType
}
