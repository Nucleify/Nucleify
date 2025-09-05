export function hasMinLength(
  parameter: string,
  minLength: number = 8
): boolean {
  if (parameter == null) return false

  return parameter.length >= minLength
}
