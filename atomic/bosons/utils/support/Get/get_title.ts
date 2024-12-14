import { ObjectType } from 'atomic'

export function getTitle(selectedObject: ObjectType): string {
  if (!selectedObject) {
    return 'Unknown Entity'
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
