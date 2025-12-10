import type {
  DeleteEntityRequestType,
  EditEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
  GetAllEntitiesRequestType,
  GetEntityRequestType,
  LoadingRefType,
  NucDocumentationObjectInterface,
  StoreEntityRequestType,
} from 'atomic'

export interface NucDocumentationRequestsInterface {
  results: EntityResultsType<NucDocumentationObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllDocumentation: GetAllEntitiesRequestType<NucDocumentationObjectInterface>
  getCountDocumentationByCreatedLastWeek: GetEntityRequestType
  storeDocumentation: StoreEntityRequestType<NucDocumentationObjectInterface>
  editDocumentation: EditEntityRequestType<NucDocumentationObjectInterface>
  deleteDocumentation: DeleteEntityRequestType
}
