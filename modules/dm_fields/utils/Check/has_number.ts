export function hasNumber(parameter: string): boolean {
  if (parameter == null) return false

  return /\d/.test(parameter)
}
