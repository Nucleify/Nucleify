import { useToast as usePrimeVueToast } from 'primevue/usetoast'
import { ToastServiceMethods } from 'primevue/toastservice'

import {
    MessageOrMessagesType,
    ToastSeverityType,
    UseToastInterface,
} from 'atomic/bosons/types'

export function useToast(): UseToastInterface {
    const toast: ToastServiceMethods = usePrimeVueToast()

    function closeToast(): void {
        document
            .querySelectorAll('.p-toast-message')
            .forEach((element: Element): void => {
                element.remove()
            })
    }

    function flashToast(
        messageOrMessages: MessageOrMessagesType,
        severity: ToastSeverityType,
        life: number
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
                    if (
                        Object.prototype.hasOwnProperty.call(
                            messageOrMessages,
                            value as string
                        )
                    ) {
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
