import {
    DeleteEntityRequestType,
    EditUserRequestFunctionType,
    GetAllUsersRequestFunctionType,
    GetUserRequestFunctionType,
    LoadingType,
    StoreUserRequestFunctionType,
    TimeoutType,
    UserResultsType,
} from 'atomic/bosons/types'

export interface UserRequestsInterface {
    results: UserResultsType
    loading: LoadingType
    getAllUsers: (timeout?: TimeoutType) => GetAllUsersRequestFunctionType
    getUser: () => GetUserRequestFunctionType
    storeUser: StoreUserRequestFunctionType
    editUser: EditUserRequestFunctionType
    deleteUser: DeleteEntityRequestType
}
