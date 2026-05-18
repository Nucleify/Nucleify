import type { NucAuthUserInterface } from 'nucleify'
import { sessionStorageSetItem } from 'nucleify'

const userKeys = [
  'id',
  'name',
  'email',
  'phone_number',
  'language',
  'country',
  'role',
  'created_at',
  'updated_at',
  'email_verified_at',
] as const

export function setUserToSessionStorage(
  user: NucAuthUserInterface | null | undefined
): void {
  if (!user) {
    return
  }

  userKeys.forEach((key): void => {
    const value = user[key]
    const normalizedValue =
      value !== null && value !== undefined ? String(value) : ''
    sessionStorageSetItem(`user_${key}`, normalizedValue)
  })
}
