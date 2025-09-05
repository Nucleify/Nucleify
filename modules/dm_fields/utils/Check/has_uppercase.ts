export function hasUppercase(password: string): boolean {
  return /[A-Z]/.test(password)
}
