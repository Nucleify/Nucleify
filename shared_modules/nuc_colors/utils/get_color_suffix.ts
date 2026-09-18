type MaybeRefString = { value?: string } | string | undefined

export function getColorSuffix(officeType: MaybeRefString): 'system' | 'user' {
  const officeTypeValue =
    typeof officeType === 'object' &&
    officeType !== null &&
    'value' in officeType
      ? officeType.value
      : officeType

  if (!officeTypeValue || officeTypeValue === 'default') {
    return 'system'
  }
  if (officeTypeValue === 'front-office') {
    return 'system'
  }
  return 'user'
}
