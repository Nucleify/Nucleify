import type {
  DeleteEntityRequestType,
  EditEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
  GetAllEntitiesRequestType,
  GetEntitiesByCategoryRequestType,
  GetEntityRequestType,
  GetSiteEntitiesRequestType,
  LinkObjectInterface,
  LoadingRefType,
  StoreEntityRequestType,
} from 'atomic'

export interface LinkRequestsInterface {
  results: EntityResultsType<LinkObjectInterface>
  resultsByCategory: EntityResultsType<LinkObjectInterface>
  resultsBySite: EntityResultsType<LinkObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllLinks: GetAllEntitiesRequestType<LinkObjectInterface>
  getLinksByCategory: GetEntitiesByCategoryRequestType
  getSiteLinks: GetSiteEntitiesRequestType
  getCountLinksByCreatedLastWeek: GetEntityRequestType
  storeLink: StoreEntityRequestType<LinkObjectInterface>
  editLink: EditEntityRequestType<LinkObjectInterface>
  deleteLink: DeleteEntityRequestType
}
