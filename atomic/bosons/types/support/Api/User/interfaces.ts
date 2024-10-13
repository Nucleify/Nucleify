import {
    DeleteEntityRequestType,
    EditEntityRequestFunctionType,
    GetAllEntitiesRequestFunctionType,
    GetEntityRequestFunctionType,
    LoadingType,
    StoreEntityRequestFunctionType,
    UserInterface,
    UserResultsType,
} from 'atomic/bosons/types'

export interface UserRequestsInterface {
    results: UserResultsType
    loading: LoadingType
    getAllUsers: GetAllEntitiesRequestFunctionType<UserInterface>
    getUser: GetEntityRequestFunctionType<UserInterface>
    storeUser: StoreEntityRequestFunctionType<UserInterface>
    editUser: EditEntityRequestFunctionType<UserInterface>
    deleteUser: DeleteEntityRequestType
}
