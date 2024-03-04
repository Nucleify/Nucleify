// AUTH
export { default as login } from './auth/handleLogin'
export { default as logout } from './auth/handleLogout'
export { default as testLogin } from './auth/handleTestLogin'

// SUPPORT
export { default as closeToast } from './support/handleCloseToast'
export { default as fetchUser } from './support/handleFetchUser'
export { default as useToastService } from './support/handleFlashToast'
export { default as useApiErrorsService } from './support/handleApiErrors'
export { default as removeUserFromSessionStorage } from './support/handleRemoveUserFromSessionStorage'
export { default as setUserToSessionStorage } from './support/handleSetUserToSessionStorage'
