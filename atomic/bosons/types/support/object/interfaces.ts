export interface ActivityLogInterface {
    id: number
    description: string
    created_at: string
    causer_id: number
}

export interface ArticleInterface {
    id?: number
    title: string
    description: string
    created_at: string
    updated_at?: string
    category: string
}

export interface ContactInterface {
    id?: number
    first_name: string
    last_name: string
    full_name?: string
    email: string
    personal_phone: string
    work_phone: string
    address: string
    birthday: string
    contact_groups: string
    role: string
    created_at?: string
    updated_at?: string
}

export interface UserInterface {
    id?: number
    name: string
    email: string
    role: string
    password?: string
    confirm_password?: string
    created_at?: string
    updated_at?: string
    email_verified_at?: string
}
