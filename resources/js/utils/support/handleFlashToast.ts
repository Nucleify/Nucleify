import { useToast } from 'primevue/usetoast'
import { ToastServiceMethods } from 'primevue/toastservice'

import {
    MessageOrMessagesType,
    ToastSeverityType,
    UseFlashToastInterface,
} from '@/types'
import { closeToast } from '@/utils'

export default function useFlashToast(): UseFlashToastInterface {
    const toast: ToastServiceMethods = useToast()

    function flashToast(
        messageOrMessages: MessageOrMessagesType,
        severity: ToastSeverityType
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
            life: 5000,
        })
    }

    return { flashToast }
}
