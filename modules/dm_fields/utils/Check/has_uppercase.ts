export function hasUppercase(parameter: string): boolean {
  if (!parameter) return false

  return /[A-Z]/.test(parameter)
}
