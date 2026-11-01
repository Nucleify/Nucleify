/** Scroll offset without getBoundingClientRect (sections are direct scroller children). */
export function scrollSectionOffset(
  scroller: HTMLElement,
  target: HTMLElement
): number {
  if (target.parentElement === scroller) {
    return target.offsetTop
  }

  let top = 0
  let node: HTMLElement | null = target
  while (node && node !== scroller) {
    top += node.offsetTop
    node = node.offsetParent as HTMLElement | null
    if (node && !scroller.contains(node)) break
  }
  return top
}
