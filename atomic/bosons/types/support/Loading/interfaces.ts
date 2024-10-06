import { LoadingRefType } from 'atomic/bosons/types'

export interface UseLoadingInterface {
    loading: LoadingRefType
    setLoading: (state: boolean, timeout?: number) => void
}
