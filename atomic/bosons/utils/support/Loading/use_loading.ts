import { ref } from 'vue'

import { LoadingRefType } from 'atomic/bosons/types'

export function useLoading() {
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
