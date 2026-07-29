import type { LoadingRefType } from './variables'

export interface UseLoadingInterface {
  loading: LoadingRefType
  setLoading: (state: boolean, timeout?: number) => void
}
