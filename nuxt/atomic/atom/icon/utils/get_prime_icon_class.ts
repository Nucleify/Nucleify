export function getPrimeIconClass(
  icon: string | undefined,
  storybook: boolean | undefined
): string {
  if (!storybook || !icon?.startsWith('prime:')) return ''
  return `pi pi-${icon.replace('prime:', '')}`
}
