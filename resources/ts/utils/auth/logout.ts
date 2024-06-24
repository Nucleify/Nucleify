import { navigateTo, removeUserFromSessionStorage } from '@/utils'

export default function logout(): void {
    navigateTo('/logout')
    removeUserFromSessionStorage()
}
