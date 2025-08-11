import type {
  MessageOrMessagesType,
  ToastSeverityType,
  UseToastInterface,
} from 'atomic'

import { useNuxtApp } from 'nuxt/app'

export function useToast(): UseToastInterface {
  const nuxtApp = useNuxtApp()
  const getToast = () => nuxtApp.vueApp.config.globalProperties.$toast
  const toast = getToast()

  function closeToast(): void {
    if (import.meta.client) {
      document
        .querySelectorAll('.p-toast-message')
        .forEach((element: Element): void => {
          element.remove()
        })
    }
  }

  function flashToast(
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

    toast.add({
      severity: severity,
      summary: message,
      life: life ? life : 5000,
    })
  }

  return { closeToast, flashToast }
}
