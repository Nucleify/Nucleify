import { MessageOrMessagesType } from './handleVariablesTypes'
import { ApiErrorsInterface, ContactInterface, ToastSeverityType, UserInterface } from './index'
import { Ref }  from "vue"

export interface ActivityLog {
    id: number
    description: string
    created_at: string
    causer_id: number
}

export interface ApiErrors {
    response: {
        status: number
        data: {
            error?: string
            errors: MessageOrMessagesType
        }
    }
}

export type AxiosFunction = Promise<undefined> & {
    then: Promise<undefined>['then']
    catch: Promise<undefined>['catch']
    finally: Promise<undefined>['finally']
}

export interface Chart {
    labels: string[]
    datasets: {
        label: string
        backgroundColor: string
        borderColor: string
        data: number[]
    }[]
}

export interface Contact {
    id: number
    first_name: string
    last_name: string
    full_name?: string
    email: string
    personal_phone: string
    work_phone: string
    address: string
    birthday: string
    contact_groups: string
    role: string
    created_at: string
    updated_at: string
}

export interface ContactApiMethods {
    results: Ref,
    getAllContacts: () => Promise<ContactInterface[]>
}

export interface User {
    id: number
    name: string
    email: string
    role: string
    created_at: string
    updated_at: string
    email_verified_at: string
}

export interface UseApiErrorsService {
    apiErrors: (error: ApiErrorsInterface) => void
}

export interface UserApiMethods {
    results: Ref,
    getAllUsers: () => Promise<UserInterface[]>
    getUser: () => Promise<UserInterface>
}

export interface UseFlashToast {
    flashToast: (
        messageOrMessages: MessageOrMessagesType,
        severity: ToastSeverityType
    ) => void
}
