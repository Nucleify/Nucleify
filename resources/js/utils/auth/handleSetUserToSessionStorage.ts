import { UserData } from '../handleInterfaces'

export function setUserToSessionStorage(user: UserData): void {
    window.sessionStorage.setItem('user_id', JSON.stringify(user.id))
    window.sessionStorage.setItem('user_name', JSON.stringify(user.name))
    window.sessionStorage.setItem('user_email', JSON.stringify(user.email))
    window.sessionStorage.setItem('user_role', JSON.stringify(user.role))
    window.sessionStorage.setItem('user_created_at', JSON.stringify(user.created_at))
    window.sessionStorage.setItem('user_updated_at', JSON.stringify(user.updated_at))
    window.sessionStorage.setItem('user_email_verified_at', JSON.stringify(user.email_verified_at))
}
