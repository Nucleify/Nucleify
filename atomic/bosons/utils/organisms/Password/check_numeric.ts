export function checkNumeric(password: string): boolean {
  return /\d/.test(password)
}
