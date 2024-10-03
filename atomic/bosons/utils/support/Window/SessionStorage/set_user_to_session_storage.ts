import { UserInterface } from 'atomic/bosons/types'

export function setUserToSessionStorage(user: UserInterface): void {
    const sanitizedUser: UserInterface = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at,
        email_verified_at: user.email_verified_at,
    }

    Object.entries(sanitizedUser).forEach(
        ([key, value]: [string, UserInterface[keyof UserInterface]]): void => {
            window.sessionStorage.setItem(
                `user_${key}`,
                JSON.stringify(value).replace(/^"|"$/g, '')
            )
        }
    )
}
