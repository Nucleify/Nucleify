import { ref, Ref } from 'vue'

export default function useLoading() {
    const loading: Ref<boolean> = ref(false)

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
