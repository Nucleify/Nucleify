import type { MessageOrMessagesType } from '../types/errors/variables'

export type ToastSeverityType = 'success' | 'info' | 'warn' | 'error'

interface ToastInstance {
  add: (opts: {
    severity: ToastSeverityType
    summary: string
    life: number
  }) => void
}

let toastInstance: ToastInstance | null = null

export function setToastInstance(instance: ToastInstance): void {
  toastInstance = instance
}

function getToastInstance(): ToastInstance | null {
  return toastInstance
}

export function closeToast(): void {
  if (import.meta.client) {
    document
      .querySelectorAll('.p-toast-message')
      .forEach((element: Element): void => {
        element.remove()
      })
  }
}

export function flashToast(
  messageOrMessages: MessageOrMessagesType,
  severity: ToastSeverityType,
  life?: number
): void {
  closeToast()

  let message = ''

  switch (typeof messageOrMessages) {
    case 'string':
      message = messageOrMessages
      break
    default:
      if (severity === 'warn') {
        message = 'Validation errors:'
      }
      for (const value in messageOrMessages) {
        if (Object.hasOwn(messageOrMessages, value)) {
          message += `\n- ${messageOrMessages[value as keyof typeof messageOrMessages]}`
        }
      }
      break
  }

  const toast = getToastInstance()
  if (!toast?.add) return
  toast.add({
    severity,
    summary: message,
    life: life ?? 5000,
  })
}
