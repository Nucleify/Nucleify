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

export function removeUserFromSessionStorage(): void {
  userKeys.forEach((key): void => {
    sessionStorageSetItem(`user_${key}`, '')
  })
}
