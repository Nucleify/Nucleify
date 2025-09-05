export function passwordsMatch(
  password: string,
  password_confirmation: string
): boolean {
  return password === password_confirmation
}
