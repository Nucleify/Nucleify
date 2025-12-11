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
  NucTechnologyObjectInterface,
  StoreEntityRequestType,
} from 'atomic'

export interface NucTechnologyRequestsInterface {
  results: EntityResultsType<NucTechnologyObjectInterface>
  resultsByCategory: EntityResultsType<NucTechnologyObjectInterface>
  resultsBySite: EntityResultsType<NucTechnologyObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllTechnologies: GetAllEntitiesRequestType<NucTechnologyObjectInterface>
  getTechnologiesByCategory: GetEntitiesByCategoryRequestType
  getSiteTechnologies: GetSiteEntitiesRequestType
  getCountTechnologiesByCreatedLastWeek: GetEntityRequestType
  storeTechnology: StoreEntityRequestType<NucTechnologyObjectInterface>
  editTechnology: EditEntityRequestType<NucTechnologyObjectInterface>
  deleteTechnology: DeleteEntityRequestType
}
