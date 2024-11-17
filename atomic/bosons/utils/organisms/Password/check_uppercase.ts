export function checkUppercase(password: string): boolean {
  return /[A-Z]/.test(password)
}
