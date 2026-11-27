/**
 * Arrow/Home/End keyboard navigation for a horizontal/vertical tablist.
 * Expects `data-index` on the focused tab button.
 */
export function rovingTabKeydown(
  event: KeyboardEvent,
  length: number,
  onSelect: (index: number) => void
): void {
  if (length <= 0) return

  const target = event.currentTarget as HTMLElement | null
  const index = Number(target?.dataset.index ?? Number.NaN)
  if (!Number.isFinite(index)) return

  let next = index
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    next = (index + 1) % length
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    next = (index - 1 + length) % length
  } else if (event.key === 'Home') {
    next = 0
  } else if (event.key === 'End') {
    next = length - 1
  } else {
    return
  }

  event.preventDefault()
  onSelect(next)
}
