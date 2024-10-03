import {
    ContactResultsType,
    DeleteEntityRequestType,
    EditContactRequestFunctionType,
    GetAllContactsRequestFunctionType,
    LoadingType,
    StoreContactRequestFunctionType,
    TimeoutType,
} from 'atomic/bosons/types'

export interface ContactRequestsInterface {
    results: ContactResultsType
    loading: LoadingType
    getAllContacts: (timeout?: TimeoutType) => GetAllContactsRequestFunctionType
    storeContact: StoreContactRequestFunctionType
    editContact: EditContactRequestFunctionType
    deleteContact: DeleteEntityRequestType
}
