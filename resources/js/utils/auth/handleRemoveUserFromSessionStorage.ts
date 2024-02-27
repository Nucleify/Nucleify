export function removeUserFromSessionStorage(): void {
    window.sessionStorage.removeItem('user_id')
    window.sessionStorage.removeItem('user_name')
    window.sessionStorage.removeItem('user_email')
    window.sessionStorage.removeItem('user_role')
    window.sessionStorage.removeItem('user_created_at')
    window.sessionStorage.removeItem('user_updated_at')
    window.sessionStorage.removeItem('user_email_verified_at')
}
