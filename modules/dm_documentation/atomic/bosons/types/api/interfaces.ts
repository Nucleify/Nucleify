import type {
  DeleteEntityRequestType,
  DocumentationObjectInterface,
  EditEntityRequestType,
  EntityCountResultsType,
  EntityResultsType,
  GetAllEntitiesRequestType,
  GetEntityRequestType,
  LoadingRefType,
  StoreEntityRequestType,
} from 'atomic'

export interface DocumentationRequestsInterface {
  results: EntityResultsType<DocumentationObjectInterface>
  createdLastWeek: EntityCountResultsType
  loading: LoadingRefType
  getAllDocumentation: GetAllEntitiesRequestType<DocumentationObjectInterface>
  getCountDocumentationByCreatedLastWeek: GetEntityRequestType
  storeDocumentation: StoreEntityRequestType<DocumentationObjectInterface>
  editDocumentation: EditEntityRequestType<DocumentationObjectInterface>
  deleteDocumentation: DeleteEntityRequestType
}
