export function checkLowercase(password: string): boolean {
  return /[a-z]/.test(password)
}
