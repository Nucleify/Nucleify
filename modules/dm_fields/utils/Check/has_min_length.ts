export function hasMinLength(
  parameter: string,
  minLength: number = 8
): boolean {
  if (!parameter) return false

  return parameter.length >= minLength
}
