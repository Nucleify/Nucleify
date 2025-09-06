export function hasLowercase(parameter: string): boolean {
  if (!parameter) return false

  return /[a-z]/.test(parameter)
}
