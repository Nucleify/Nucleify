import { isEmptyArray, isEmptyObject, isEmptyString } from '.'

export function isEmpty(parameter: unknown): boolean {
  if (!parameter) return true

  switch (typeof parameter) {
    case 'string':
      return isEmptyString(parameter)
    case 'object':
      return Array.isArray(parameter)
        ? isEmptyArray(parameter)
        : isEmptyObject(parameter as object)
    default:
      return false
  }
}
