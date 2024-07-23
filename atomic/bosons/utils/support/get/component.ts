export function getComponent(type: string) {
    switch (type) {
        case 'textarea':
            return 'Textarea'
        case 'input-text':
            return 'input-text-atom'
        case 'input-date':
            return 'Calendar'
        case 'dropdown':
            return 'Dropdown'
        default:
            return 'input-text-atom'
    }
}
