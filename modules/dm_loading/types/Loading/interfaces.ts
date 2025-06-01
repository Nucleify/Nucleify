import type { LoadingRefType } from 'atomic'

export interface UseLoadingInterface {
  loading: LoadingRefType
  setLoading: (state: boolean, timeout?: number) => void
}
