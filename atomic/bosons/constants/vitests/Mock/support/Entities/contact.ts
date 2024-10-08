import { ContactInterface } from 'atomic/bosons/types'

export const mockContact: ContactInterface = {
    id: 999999,
    first_name: 'Example',
    last_name: 'Example',
    email: 'example@example.com',
    personal_phone: '123-456-7890',
    work_phone: '098-765-4321',
    address: '123 Example St',
    birthday: '1990-01-01',
    contact_groups: 'Friends',
    role: 'tech',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
}
