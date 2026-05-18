import type { Toast } from 'primereact/toast'

import type {
  MessageOrMessagesType,
  ToastSeverityType,
  UseToastInterface,
} from '../types'

const toastRef: { current: Toast | null } = { current: null }

export function useAtomicToast(): UseToastInterface {
  function closeToast(): void {
    toastRef.current?.clear()
  }

  function flashToast(
    messageOrMessages: MessageOrMessagesType,
    severity: ToastSeverityType,
    life?: number
  ): void {
    closeToast()

    let message = ''

    if (typeof messageOrMessages === 'string') {
      message = messageOrMessages
    } else if (messageOrMessages && typeof messageOrMessages === 'object') {
      if (severity === 'warn') {
        message = 'Validation errors:'
      }

      for (const key in messageOrMessages) {
        if (Object.hasOwn(messageOrMessages, key)) {
          const errors = (messageOrMessages as Record<string, string[]>)[key]
          message += `\n- ${Array.isArray(errors) ? errors.join(', ') : errors}`
        }
      }
    }

    toastRef.current?.show({
      severity: severity || 'info',
      summary: message,
      life: life || 5000,
    })
  }

  return {
    toastRef,
    closeToast,
    flashToast,
  }
}
