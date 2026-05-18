export function getTitle(selectedObject: ObjectType): string {
  if (!selectedObject) {
    return 'Unknown Entity'
  }

  const propertyOrder = [
    'title',
    'name',
    'first_name',
    'last_name',
    'header',
    'label',
    'src',
    'content',
  ]

  for (const property of propertyOrder) {
    if (property in selectedObject) {
      if (property === 'first_name' && 'last_name' in selectedObject) {
        return `${selectedObject.first_name} ${selectedObject.last_name}`
      }
      return String(selectedObject[property as keyof ObjectType])
    }
  }

  return 'Unknown Entity'
}
