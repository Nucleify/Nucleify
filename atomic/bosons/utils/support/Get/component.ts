export function getComponent(type: string) {
    switch (type) {
        case 'textarea':
            return 'ad-textarea'
        case 'input-text':
            return 'ad-input-text'
        case 'calendar':
            return 'ad-calendar'
        case 'dropdown':
            return 'Dropdown'
        case 'password':
            return 'ad-password'
        default:
            return 'ad-input-text'
    }
}
