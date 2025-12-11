import type { NucUserObjectInterface } from 'atomic'
import { sessionStorageSetItem } from 'atomic'

export function setUserToSessionStorage(
  user: NucUserObjectInterface | null | undefined
): void {
  if (!user) {
    return
  }

  const sanitizedUser: NucUserObjectInterface = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    created_at: user.created_at,
    updated_at: user.updated_at,
    email_verified_at: user.email_verified_at,
  }

  Object.entries(sanitizedUser).forEach(
    ([key, value]: [
      string,
      NucUserObjectInterface[keyof NucUserObjectInterface],
    ]): void => {
      const stringValue =
        value !== null && value !== undefined
          ? JSON.stringify(value).replace(/^"|"$/g, '')
          : ''
      sessionStorageSetItem(`user_${key}`, stringValue)
    }
  )
}
