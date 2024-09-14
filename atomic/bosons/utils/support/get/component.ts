export function getComponent(type: string) {
    switch (type) {
        case 'textarea':
            return 'textarea-atom'
        case 'input-text':
            return 'input-text-atom'
        case 'calendar':
            return 'calendar-molecule'
        case 'dropdown':
            return 'Dropdown'
        default:
            return 'input-text-atom'
    }
}
