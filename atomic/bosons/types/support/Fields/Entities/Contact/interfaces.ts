export interface ContactFieldInterface {
    name: string
    label: string
    key?: string
    type?: 'input-text' | 'textarea' | 'calendar' | 'dropdown'
    props?: {
        type?: string
        options?: Array<{ label: string; value: string }>
        placeholder?: string
    }
}
