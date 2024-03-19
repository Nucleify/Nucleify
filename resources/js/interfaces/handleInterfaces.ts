import { MessageOrMessagesType } from './handleVariablesTypes'
import { ToastSeverityType } from './index'
import { Ref } from 'vue'

/**
 *  Activity Log
 */
export interface ActivityLogInterface {
    id: number
    description: string
    created_at: string
    causer_id: number
}
export interface ActivityLogApiMethodsInterface {
    results: Ref<ActivityLogInterface[] | undefined>
    getAllActivities: () => Promise<ActivityLogInterface[]> | void
    deleteActivity: (id: number, getData: () => void, close: (method: string) => void) => Promise<void>
}

/**
 *  Api errors
 */
export interface ApiErrorsInterface {
    response: {
        status: number
        data: {
            error?: string
            errors: MessageOrMessagesType
        }
    }
}

/**
 *  Chart
 */
export interface ChartInterface {
    labels: string[]
    datasets:
        | {
              label: string
              backgroundColor: string
              borderColor: string
              data: (number | undefined)[]
          }[]
        | {
              data: (number | undefined)[]
              backgroundColor: string[]
              hoverBackgroundColor: string[]
          }[]
}

/**
 *  Contact
 */
export interface ContactInterface {
    id?: number
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
    created_at?: string
    updated_at?: string
}
export interface ContactApiMethodsInterface {
    results: Ref<ContactInterface[] | undefined>
    getAllContacts: () => Promise<ContactInterface[]>
    storeContact: (data: ContactInterface, getData: () => void, close: (method: string) => void) => Promise<void>
    editContact: (data: ContactInterface, getData: () => void, close: (method: string) => void) => Promise<void>
    deleteContact: (id: number, getData: () => void, close: (method: string) => void) => Promise<void>
}

/**
 *  Form data
 */
export interface LoginFormInterface {
    email: string
    password: string
}
export interface RegisterFormInterface {
    name: string
    email: string
    password: string
    password_confirmation: string
    role: string
}

/**
 *  User
 */
export interface UserInterface {
    id?: number
    name: string
    email: string
    role: string
    password?: string
    confirm_password?: string
    created_at?: string
    updated_at?: string
    email_verified_at?: string
}
export interface UserApiMethodsInterface {
    results: Ref<UserInterface[] | undefined>
    getAllUsers: () => Promise<void | UserInterface[]>
    getUser: () => Promise<void | UserInterface>
    storeUser: (data: UserInterface, getData: () => void, close: (method: string) => void) => Promise<void>
    editUser: (data: UserInterface, getData: () => void, close: (method: string) => void) => Promise<void>
    deleteUser: (id: number, getData: () => void, close: (method: string) => void) => Promise<void>
}

/**
 *  Use functions
 */
export interface UseApiErrorsServiceInterface {
    apiErrors: (error: ApiErrorsInterface) => void
}
export interface UseFlashToastInterface {
    flashToast: (
        messageOrMessages: MessageOrMessagesType,
        severity: ToastSeverityType
    ) => void
}
