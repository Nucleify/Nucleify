export function passwordsMatch(
  password: string,
  password_confirmation: string
): boolean {
  if (!password || !password_confirmation) return false

  return password === password_confirmation
}
