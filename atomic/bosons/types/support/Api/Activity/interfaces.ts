import {
    ActivityResultsType,
    CloseDialogFunctionType,
    DeleteEntityRequestFunctionType,
    GetAllActivitiesRequestFunctionType,
    LoadingType,
    TimeoutType,
} from 'atomic/bosons/types'

export interface ActivityLogRequestsInterface {
    results: ActivityResultsType
    loading: LoadingType
    close: CloseDialogFunctionType
    getAllActivities: (
        timeout?: TimeoutType
    ) => GetAllActivitiesRequestFunctionType
    deleteActivity: DeleteEntityRequestFunctionType
}
