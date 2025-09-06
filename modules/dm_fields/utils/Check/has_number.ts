export function hasNumber(parameter: string): boolean {
  if (!parameter) return false

  return /\d/.test(parameter)
}
