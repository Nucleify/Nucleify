import type {
  DeleteEntityRequestType,
  EditEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
  GetAllEntitiesRequestType,
  GetEntitiesByCategoryRequestType,
  GetEntityRequestType,
  GetSiteEntitiesRequestType,
  LinkInterface,
  LoadingRefType,
  StoreEntityRequestType,
} from 'atomic'

export interface LinkRequestsInterface {
  results: EntityResultsType<LinkInterface>
  resultsByCategory: EntityResultsType<LinkInterface>
  resultsBySite: EntityResultsType<LinkInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllLinks: GetAllEntitiesRequestType<LinkInterface>
  getLinksByCategory: GetEntitiesByCategoryRequestType
  getSiteLinks: GetSiteEntitiesRequestType
  getCountLinksByCreatedLastWeek: GetEntityRequestType
  storeLink: StoreEntityRequestType<LinkInterface>
  editLink: EditEntityRequestType<LinkInterface>
  deleteLink: DeleteEntityRequestType
}
