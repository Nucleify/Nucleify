import { Ref } from 'vue'

import {
  DeleteEntityRequestFunctionType,
  EditEntityRequestFunctionType,
  GetAllEntitiesRequestFunctionType,
  LoadingRefType,
  StoreEntityRequestFunctionType,
  GetEntityRequestFunctionType,
  SiteType,
  LinkResultsType,
  LinkInterface,
} from 'atomic'

export interface LinkRequestsInterface {
  results: LinkResultsType
  resultsByCategory: LinkResultsType
  createdLastWeek: Ref<number>
  loading: LoadingRefType
  resultsBySite: Ref<LinkInterface[]>
  getAllLinks: GetAllEntitiesRequestFunctionType<LinkInterface>
  getLinksByCategory: (category: string) => void
  getSiteLinks: (loading: boolean, site: SiteType) => void
  getCountLinksByCreatedLastWeek: GetEntityRequestFunctionType
  storeLink: StoreEntityRequestFunctionType<LinkInterface>
  editLink: EditEntityRequestFunctionType<LinkInterface>
  deleteLink: DeleteEntityRequestFunctionType
}
