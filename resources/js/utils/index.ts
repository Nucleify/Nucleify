/**
 *  Activity log
 */
export { default as activityApiMethods } from './activity/handleActivityApiMethods'

/**
 *  Auth
 */
export { default as logout } from './auth/handleLogout'
export { default as useSubmitAuthForm } from './auth/handleUseSubmitAuthForm'
export { default as testLogin } from './auth/handleTestLogin'

/**
 *  Support
 */
export { default as closeToast } from './support/handleCloseToast'
export { default as isCurrentUrl } from './support/handleIsCurrentUrl'
export { default as openMenu } from './support/handleOpenMenu'
export { default as navigateTo } from './support/handleNavigateTo'
export { default as useFlashToast } from './support/handleFlashToast'
export { default as useApiErrors } from './support/handleApiErrors'
export { default as useChart } from './support/handleUseChart'
export { default as useMenuAndModal } from './support/handleUseMenuAndModal'

/**
 *  User
 */
export { default as removeUserFromSessionStorage } from './user/handleRemoveUserFromSessionStorage'
export { default as setUserToSessionStorage } from './user/handleSetUserToSessionStorage'

export { default as contactApiMethods } from './contact/handleContactApiMethods'
export { default as userApiMethods } from './user/handleUserApiMethods'
