export interface ContactData {
    first_name: string
    last_name: string
    email: string
    personal_phone: string
    work_phone: string
    address: string
    birthday: string
    contact_groups: string
    role: string
}

export interface UserData {
    id: number
    name: string
    email: string
    role: string
    created_at: string
    updated_at: string
    email_verified_at: string
}
