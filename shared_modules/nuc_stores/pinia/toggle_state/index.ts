export function toggleState(state: boolean): boolean {
  return typeof state === 'boolean' ? !state : state
}
