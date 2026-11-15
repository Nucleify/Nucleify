export function nuiValueFromEvent(event: Event): string | null {
  if (event instanceof CustomEvent) {
    const detail = (event as CustomEvent<{ value?: unknown }>).detail
    if (
      detail &&
      typeof detail === 'object' &&
      typeof detail.value === 'string'
    ) {
      return detail.value
    }
  }

  const host = event.currentTarget as { value?: unknown } | null
  if (typeof host?.value === 'string') return host.value

  const path =
    typeof event.composedPath === 'function' ? event.composedPath() : []
  for (const node of path) {
    if (
      node instanceof HTMLInputElement ||
      node instanceof HTMLTextAreaElement ||
      node instanceof HTMLSelectElement
    ) {
      return node.value
    }
  }

  return null
}

export function nuiHostValue(
  host: { value?: unknown } | null | undefined
): string {
  return typeof host?.value === 'string' ? host.value : ''
}
