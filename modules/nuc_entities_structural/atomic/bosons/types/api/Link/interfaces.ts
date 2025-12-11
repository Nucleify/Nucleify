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
  NucLinkObjectInterface,
  StoreEntityRequestType,
} from 'atomic'

export interface NucLinkRequestsInterface {
  results: EntityResultsType<NucLinkObjectInterface>
  resultsByCategory: EntityResultsType<NucLinkObjectInterface>
  resultsBySite: EntityResultsType<NucLinkObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllLinks: GetAllEntitiesRequestType<NucLinkObjectInterface>
  getLinksByCategory: GetEntitiesByCategoryRequestType
  getSiteLinks: GetSiteEntitiesRequestType
  getCountLinksByCreatedLastWeek: GetEntityRequestType
  storeLink: StoreEntityRequestType<NucLinkObjectInterface>
  editLink: EditEntityRequestType<NucLinkObjectInterface>
  deleteLink: DeleteEntityRequestType
}
