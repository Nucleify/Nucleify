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
  TechnologyObjectInterface,
} from 'atomic'

export interface TechnologyRequestsInterface {
  results: EntityResultsType<TechnologyObjectInterface>
  resultsByCategory: EntityResultsType<TechnologyObjectInterface>
  resultsBySite: EntityResultsType<TechnologyObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllTechnologies: GetAllEntitiesRequestType<TechnologyObjectInterface>
  getTechnologiesByCategory: GetEntitiesByCategoryRequestType
  getSiteTechnologies: GetSiteEntitiesRequestType
  getCountTechnologiesByCreatedLastWeek: GetEntityRequestType
  storeTechnology: StoreEntityRequestType<TechnologyObjectInterface>
  editTechnology: EditEntityRequestType<TechnologyObjectInterface>
  deleteTechnology: DeleteEntityRequestType
}
