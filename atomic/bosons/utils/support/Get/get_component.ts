import { ComponentType } from 'atomic/bosons/types'

export function getComponent(type: string): string {
    const componentMap: ComponentType[] = [
        'textarea',
        'input-text',
        'calendar',
        'password',
        'input-mask',
    ]

    if (componentMap.includes(type)) {
        return `ad-${type}`
    } else if (type === 'dropdown') {
        // TODO: delete condition after move dropdown component to atomic design
        return 'Dropdown'
    } else {
        return 'ad-input-text'
    }
}
