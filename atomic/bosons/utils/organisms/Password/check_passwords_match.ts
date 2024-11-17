export function checkPasswordsMatch(
  password: string,
  password_confirmation: string
): boolean {
  return password === password_confirmation
}
