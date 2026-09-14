import { ref } from 'vue'

import type { UseLoadingInterface } from '../types/loading/interfaces'
import type { LoadingRefType } from '../types/loading/variables'

export function useLoading(): UseLoadingInterface {
  const loading: LoadingRefType = ref(false)

  function setLoading(state: boolean, timeout?: number): void {
    if (timeout) {
      setTimeout((): void => {
        loading.value = state
      }, timeout)
    } else {
      loading.value = state
    }
  }

  return {
    loading,
    setLoading,
  }
}
