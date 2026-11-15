import { getAdminConfig } from '@shared_modules'

type ToastTone = 'success' | 'error' | 'info'

type ToastItem = {
  id: number
  message: string
  tone: ToastTone
}

const toasts = ref<ToastItem[]>([])
let seq = 0

function toastLimits() {
  const cfg = getAdminConfig().toast
  return {
    limit: cfg?.limit ?? 3,
    durationMs: cfg?.durationMs ?? 4000,
  }
}

export function useToast() {
  function push(message: string, tone: ToastTone = 'info') {
    const { limit, durationMs } = toastLimits()
    const id = ++seq
    toasts.value = [{ id, message, tone }, ...toasts.value].slice(0, limit)
    if (import.meta.client) {
      window.setTimeout(() => {
        toasts.value = toasts.value.filter((t) => t.id !== id)
      }, durationMs)
    }
  }

  return {
    toasts,
    success: (message: string) => push(message, 'success'),
    error: (message: string) => push(message, 'error'),
    info: (message: string) => push(message, 'info'),
    dismiss: (id: number) => {
      toasts.value = toasts.value.filter((t) => t.id !== id)
    },
  }
}

export const useAdminToast = useToast
