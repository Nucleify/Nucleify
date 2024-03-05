/**
 *  Auth
 */
export { default as login } from './auth/handleLogin'
export { default as logout } from './auth/handleLogout'
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
export { default as useModal } from './support/handleUseModal'

/**
 *  User
 */
export { default as removeUserFromSessionStorage } from './user/handleRemoveUserFromSessionStorage'
export { default as setUserToSessionStorage } from './user/handleSetUserToSessionStorage'

export { default as contactApiMethods } from './contact/handleContactApiMethods'
export { default as userApiMethods } from './user/handleUserApiMethods'
