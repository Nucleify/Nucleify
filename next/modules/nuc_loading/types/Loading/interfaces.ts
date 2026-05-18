import type { LoadingRefType } from 'nucleify'

export interface UseLoadingInterface {
  loading: LoadingRefType
  setLoading: (state: boolean, timeout?: number) => void
}
