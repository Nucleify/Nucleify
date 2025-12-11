export function isEmptyObject(parameter: object): boolean {
  return !parameter || Object.keys(parameter).length === 0
}
