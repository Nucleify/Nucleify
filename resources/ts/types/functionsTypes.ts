import { AxiosResponse } from 'axios'
import Menu from 'primevue/menu'
import { Ref } from 'vue'

import {
    ActivityLogInterface,
    ApiErrorsInterface,
    ArticleInterface,
    ColorItemStyleInterface,
    ContactInterface,
    HomeItemsInterface,
    MessageOrMessagesType,
    ObjectType,
    ToastSeverityType,
    UserInterface,
} from '@/types'

/**
 *  Api
 */
export type ApiErrorsFunctionType = (error: ApiErrorsInterface) => void
export type GetAllActivitiesAxiosFunctionType = Promise<
    void | ActivityLogInterface[]
>
export type GetAllArticlesAxiosFunctionType = AxiosResponse<ArticleInterface[]>
export type GetAllArticlesFunctionType = Promise<void | ArticleInterface[]>
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

export type StoreArticleFunctionType = (
    data: ArticleInterface,
    getData: () => void,
    close: (method: string) => void
) => Promise<void>
export type EditArticleFunctionType = (
    data: ArticleInterface,
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

/**
 *  Toast
 */
export type FlashToastFunctionType = (
    messageOrMessages: MessageOrMessagesType,
    severity: ToastSeverityType
) => void
