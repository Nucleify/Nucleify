export function hasLowercase(parameter: string): boolean {
  if (parameter == null) return false

  return /[a-z]/.test(parameter)
}
