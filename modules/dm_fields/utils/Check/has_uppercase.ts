export function hasUppercase(parameter: string): boolean {
  if (parameter == null) return false

  return /[A-Z]/.test(parameter)
}
