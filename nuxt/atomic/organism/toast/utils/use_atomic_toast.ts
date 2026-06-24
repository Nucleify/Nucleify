import { useNuxtApp } from 'nuxt/app'

import type { MessageOrMessagesType, ToastSeverityType } from 'nucleify'

function getToastInstance() {
  if (!import.meta.client) return undefined
  return useNuxtApp().vueApp.config.globalProperties.$toast
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

  let message: string = ''

  switch (typeof messageOrMessages) {
    case 'string':
      message = messageOrMessages
      break
    default:
      if (severity === 'warn') {
        message = 'Validation errors:'
      }

      for (const value in messageOrMessages) {
        if (Object.hasOwn(messageOrMessages, value as string)) {
          message += `\n- ${messageOrMessages[value].join(', ')}`
        }
      }
      break
  }

  const toast = getToastInstance()
  if (!toast?.add) return
  toast.add({
    severity: severity,
    summary: message,
    life: life ? life : 5000,
  })
}
