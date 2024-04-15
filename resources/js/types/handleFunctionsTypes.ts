import { AxiosResponse } from 'axios'

import {
    ActivityLogInterface,
    ApiErrorsInterface,
    ColorItemStyleInterface,
    ContactInterface,
    HomeItemsInterface,
    MessageOrMessagesType,
    ObjectType,
    ToastSeverityType,
    UserInterface,
} from '@/types'
import Menu from 'primevue/menu'
import { Ref } from 'vue'

/**
 *  Api
 */
export type ApiErrorsFunctionType = (error: ApiErrorsInterface) => void
export type GetAllActivitiesAxiosFunctionType = Promise<
    void | ActivityLogInterface[]
>
export type GetAllContactsAxiosFunctionType = AxiosResponse<ContactInterface[]>
export type GetAllContactsFunctionType = Promise<void | ContactInterface[]>
export type GetAllUsersAxiosFunctionType = AxiosResponse<UserInterface[]>
export type GetAllUsersFunctionType = Promise<void | UserInterface[]>
export type GetUserAxiosFunctionType = AxiosResponse<UserInterface>
export type GetUserFunctionType = Promise<void | UserInterface>

export type DeleteEntityFunctionType = (
    id: number,
    getData: () => void,
    close: (method: string) => void
) => Promise<void>
export type StoreContactFunctionType = (
    data: ContactInterface,
    getData: () => void,
    close: (method: string) => void
) => Promise<void>
export type EditContactFunctionType = (
    data: ContactInterface,
    getData: () => void,
    close: (method: string) => void
) => Promise<void>

export type StoreUserFunctionType = (
    data: UserInterface,
    getData: () => void,
    close: (method: string) => void
) => Promise<void>
export type EditUserFunctionType = (
    data: UserInterface,
    getData: () => void,
    close: (method: string) => void
) => Promise<void>

/**
 *  Drag items
 */
export type StartDraggingFunctionType = (item: HomeItemsInterface) => void

/**
 *  IsAdmin
 */
export type UseIsAdminFunctionType = Promise<{ isAdmin: Ref<boolean> }>

/**
 *  Menu & modal
 */
export type CloseModalFunctionType = (action: string) => void
export type OpenMenuFunctionType = (
    menu: Menu,
    event: MouseEvent,
    object: ObjectType
) => void
export type OpenModalFunctionType = (
    action: string,
    object?: ObjectType
) => void

/**
 *  Sidebar
 */
export type GetSidebarItemStyleFunctionType = (
    url: string
) => ColorItemStyleInterface | ''
export type ShouldRenderSidebarItemFunctionType = (url: string) => boolean

/**
 *  Toast
 */
export type FlashToastFunctionType = (
    messageOrMessages: MessageOrMessagesType,
    severity: ToastSeverityType
) => void
