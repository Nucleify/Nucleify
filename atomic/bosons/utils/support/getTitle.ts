import { ObjectType } from '@/types'

export function getTitle(selectedObject: ObjectType): string | undefined {
    if (!selectedObject) {
        return
    }
    switch (true) {
        case 'title' in selectedObject:
            return selectedObject.title
        case 'name' in selectedObject:
            return selectedObject.name
        case 'first_name' && 'last_name' in selectedObject:
            return selectedObject.first_name + ' ' + selectedObject.last_name
        default:
            return 'Unknown Entity'
    }
}
