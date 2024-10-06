import { UserInterface } from 'atomic/bosons/types'

export const mockUser: UserInterface = {
    id: '123',
    name: 'Example',
    email: 'example@data-manager.com',
    role: 'admin',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    email_verified_at: new Date().toISOString(),
}
