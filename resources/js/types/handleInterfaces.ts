import { Ref } from 'vue'

import {
    ActivityResultsType,
    ApiErrorsFunctionType,
    CloseModalFunctionType,
    ContactResultsType,
    DeleteEntityFunctionType,
    EditContactFunctionType,
    EditUserFunctionType,
    FlashToastFunctionType,
    GetAllActivitiesAxiosFunctionType,
    GetAllContactsFunctionType,
    GetAllUsersFunctionType,
    GetSidebarItemStyleFunctionType,
    GetUserFunctionType,
    MessageOrMessagesType,
    OpenMenuFunctionType,
    OpenModalFunctionType,
    SelectedObjectType,
    ShouldRenderSidebarItemFunctionType,
    StartDraggingFunctionType,
    StoreContactFunctionType,
    StoreUserFunctionType,
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
    getAllActivities: () => GetAllActivitiesAxiosFunctionType
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
    results: ContactResultsType
    getAllContacts: () => GetAllContactsFunctionType
    storeContact: StoreContactFunctionType
    editContact: EditContactFunctionType
    deleteContact: DeleteEntityFunctionType
}

/**
 *  Color items
 */
export interface ColorItemStyleInterface {
    color?: string | null
    backgroundColor?: string | null
    borderColor?: string | null
    boxShadow?: string | null
}
export interface ColorItemColorsInterface {
    primary: string | null
    hover: string | null
    sidebarSelected?: string | null
}

/**
 *  Display graphs
 */
export interface DisplayGraphsInterface {
    [key: string]: boolean
    Activity: boolean
    Admin: boolean
    Contact: boolean
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
    iconClass: string
    disabled: boolean
    draggableClass: boolean
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
    results: UserResultsType
    getAllUsers: () => GetAllUsersFunctionType
    getUser: () => GetUserFunctionType
    storeUser: StoreUserFunctionType
    editUser: EditUserFunctionType
    deleteUser: DeleteEntityFunctionType
}

/**
 *  Constants
 */
export interface HandleDataInterface {
    contactData: Ref<ContactInterface>
    userData: Ref<UserInterface>
}
export interface HandleStylesInterface {
    mainSidebarItemStyle: ColorItemStyleInterface
    mainStyle: ColorItemStyleInterface
    activitySidebarItemStyle: ColorItemStyleInterface
    activityStyle: ColorItemStyleInterface
    contactSidebarItemStyle: ColorItemStyleInterface
    contactStyle: ColorItemStyleInterface
    userSidebarItemStyle: ColorItemStyleInterface
    userStyle: ColorItemStyleInterface
}

/**
 *  Use functions
 */
export interface UseApiErrorsServiceInterface {
    apiErrors: ApiErrorsFunctionType
}
export interface UseColorsInterface {
    mainItemColors: ColorItemColorsInterface
    activityItemColors: ColorItemColorsInterface
    contactItemColors: ColorItemColorsInterface
    userItemColors: ColorItemColorsInterface
    setDefaultColors: () => void
}
export interface UseDisplayGraphsInterface {
    display: DisplayGraphsInterface
    displayGraphsToggle: (action: string) => void
    setDefaultGraphsDisplay: () => void
    allGraphsDisplayToggle: () => void
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
export interface UseSubmitAuthFormInterface {
    submitAuthForm: (
        data: LoginFormInterface | RegisterFormInterface
    ) => Promise<void>
}
export interface UseSidebarInterface {
    shouldRenderSidebarItem: ShouldRenderSidebarItemFunctionType
    getSidebarItemStyle: GetSidebarItemStyleFunctionType
}
