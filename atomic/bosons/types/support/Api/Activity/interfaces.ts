import {
    ActivityResultsType,
    DeleteEntityRequestFunctionType,
    GetAllActivitiesRequestFunctionType,
    LoadingType,
    TimeoutType,
} from 'atomic/bosons/types'

export interface ActivityLogApiRequestsInterface {
    results: ActivityResultsType
    loading: LoadingType
    getAllActivities: (
        timeout?: TimeoutType
    ) => GetAllActivitiesRequestFunctionType
    deleteActivity: DeleteEntityRequestFunctionType
}
