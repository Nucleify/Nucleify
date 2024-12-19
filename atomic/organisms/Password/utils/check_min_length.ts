export function checkMinLength(
  password: string | undefined | null,
  minLength: number = 8
): boolean {
  if (password === undefined || null) return false

  return password!.length >= minLength
}
