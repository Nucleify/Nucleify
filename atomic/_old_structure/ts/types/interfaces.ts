import { Ref } from 'vue'

import {
    ActivityResultsType,
    ApiErrorsFunctionType,
    ArticleResultsType,
    CloseModalFunctionType,
    ContactResultsType,
    DeleteEntityFunctionType,
    EditArticleFunctionType,
    EditContactFunctionType,
    EditUserFunctionType,
    FlashToastFunctionType,
    GetAllActivitiesAxiosFunctionType,
    GetAllArticlesFunctionType,
    GetAllContactsFunctionType,
    GetAllUsersFunctionType,
    GetSidebarItemStyleFunctionType,
    GetUserFunctionType,
    LoadingType,
    MessageOrMessagesType,
    OpenMenuFunctionType,
    OpenModalFunctionType,
    SelectedObjectType,
    StartDraggingFunctionType,
    StoreArticleFunctionType,
    StoreContactFunctionType,
    StoreUserFunctionType,
    TimeoutType,
    UserResultsType,
    VisibleType,
} from '@/types'


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
    results: ActivityResultsType
    loading: LoadingType
    getAllActivities: (
        timeout?: TimeoutType
    ) => GetAllActivitiesAxiosFunctionType
    deleteActivity: DeleteEntityFunctionType
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
 *  Article
 */
export interface ArticleInterface {
    id?: number
    title: string
    description: string
    created_at: string
    updated_at?: string
    category: string
}
export interface ArticleApiMethodsInterface {
    results: ArticleResultsType
    loading: LoadingType
    getAllArticles: (timeout?: TimeoutType) => GetAllArticlesFunctionType
    storeArticle: StoreArticleFunctionType
    editArticle: EditArticleFunctionType
    deleteArticle: DeleteEntityFunctionType
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
    results: ContactResultsType
    loading: LoadingType
    getAllContacts: (timeout?: TimeoutType) => GetAllContactsFunctionType
    storeContact: StoreContactFunctionType
    editContact: EditContactFunctionType
    deleteContact: DeleteEntityFunctionType
}

/**
 *  Dropdown
 */
export interface DropdownItemInterface {
    label: string
    icon: string
    command?: () => void
}

/**
 *  Home
 */
export interface HomeItemsInterface {
    id: number
    label: string
    href: string
    icon: string
    disabled: boolean
    draggableClass: boolean
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
    results: UserResultsType
    loading: LoadingType
    getAllUsers: (timeout?: TimeoutType) => GetAllUsersFunctionType
    getUser: () => GetUserFunctionType
    storeUser: StoreUserFunctionType
    editUser: EditUserFunctionType
    deleteUser: DeleteEntityFunctionType
}

/**
 *  Constants
 */
export interface HandleDataInterface {
    articleData: Ref<ArticleInterface>
    contactData: Ref<ContactInterface>
    userData: Ref<UserInterface>
}

/**
 *  Use functions
 */
export interface UseApiErrorsServiceInterface {
    apiErrors: ApiErrorsFunctionType
}
export interface UseDragItemsInterface {
    startDragging: StartDraggingFunctionType
}
export interface UseFlashToastInterface {
    flashToast: FlashToastFunctionType
}
export interface UseMenuAndModalInterface {
    visibleShow: VisibleType
    visibleCreate: VisibleType
    visibleEdit: VisibleType
    visibleDelete: VisibleType
    selectedObject: SelectedObjectType
    openModal: OpenModalFunctionType
    closeModal: CloseModalFunctionType
    openMenu: OpenMenuFunctionType
}
export interface UseNavbarInterface {
    navbarExpanded: Ref<boolean>
    toggleNavbar: () => void
    throttleHideNavbar: () => void
}
export interface UseSidebarInterface {
    getSidebarItemStyle: GetSidebarItemStyleFunctionType
}
export interface UseThrottleInterface {
    isThrottled: Ref<boolean>
    throttle: (callback: () => void, delay: number) => void
}

/**
 *  User Menu
 */
export interface UseUserMenuInterface {
    openUserMenu: () => void
    closeUserMenu: () => void
}
