import type { Toast } from 'primereact/toast'

import type {
  MessageOrMessagesType,
  ToastSeverityType,
} from '../types/variables'

const toastRef: { current: Toast | null } = { current: null }

export function setToastInstance(instance: Toast | null): void {
  toastRef.current = instance
}

export function closeToast(): void {
  toastRef.current?.clear()
}

export function flashToast(
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
