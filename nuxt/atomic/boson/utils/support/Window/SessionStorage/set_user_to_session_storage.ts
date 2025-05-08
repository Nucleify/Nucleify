import { UserObjectInterface } from 'atomic'

export function setUserToSessionStorage(user: UserObjectInterface): void {
  const sanitizedUser: UserObjectInterface = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    created_at: user.created_at,
    updated_at: user.updated_at,
    email_verified_at: user.email_verified_at,
  }

  Object.entries(sanitizedUser).forEach(
    ([key, value]: [string, UserObjectInterface[keyof UserObjectInterface]]): void => {
      window.sessionStorage.setItem(
        `user_${key}`,
        JSON.stringify(value).replace(/^"|"$/g, '')
      )
    }
  )
}
