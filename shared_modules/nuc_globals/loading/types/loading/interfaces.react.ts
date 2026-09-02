import type { LoadingType } from './variables.react'

export interface UseLoadingInterface {
  loading: LoadingType
  setLoading: (state: boolean, timeout?: number) => void
}
