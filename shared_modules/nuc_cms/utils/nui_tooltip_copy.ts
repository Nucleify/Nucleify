export type NuiTooltipEl = HTMLElement & {
  value: string
  autoHide: boolean
  visible: boolean
}

export function unwrapEl(el: unknown): HTMLElement | null {
  if (el instanceof HTMLElement) return el
  if (el && typeof el === 'object' && '$el' in el) {
    const nested = (el as { $el: unknown }).$el
    if (nested instanceof HTMLElement) return nested
  }
  return null
}

function tipTrigger(tip: NuiTooltipEl): Element | null {
  return tip.shadowRoot?.querySelector('.nui-tooltip-trigger') ?? null
}

/** Force-open nui-tooltip after a successful clipboard copy. */
export function showCopiedTip(tip: NuiTooltipEl, label: string): void {
  tip.autoHide = false
  tip.value = label
  const trigger = tipTrigger(tip)
  if (!trigger) return
  // nui-tooltip opens only on mouseenter/focusin — re-fire after value is set.
  tip.autoHide = true
  trigger.dispatchEvent(new Event('mouseleave'))
  tip.autoHide = false
  requestAnimationFrame(() => {
    trigger.dispatchEvent(new Event('mouseenter'))
  })
}

export function hideCopiedTip(tip: NuiTooltipEl): void {
  tip.autoHide = true
  tip.value = ''
  tipTrigger(tip)?.dispatchEvent(new Event('mouseleave'))
}
