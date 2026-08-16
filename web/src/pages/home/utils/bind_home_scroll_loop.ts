function getScroller(root: HTMLElement): HTMLElement {
  return root.querySelector<HTMLElement>('.nuc-home-scroller') ?? root
}

function isAtLastSlide(scroller: HTMLElement, lastSectionId: string): boolean {
  const root = scroller.closest('.nuc-home') ?? scroller
  const section = root.querySelector<HTMLElement>(`#${lastSectionId}`)
  if (!section) return false

  const atEnd =
    scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 4

  const scrollerRect = scroller.getBoundingClientRect()
  const sectionRect = section.getBoundingClientRect()
  const visible =
    sectionRect.top < scrollerRect.bottom - scrollerRect.height * 0.2 &&
    sectionRect.bottom > scrollerRect.top + scrollerRect.height * 0.2

  return atEnd && visible
}

/** Jump to first slide immediately (bypasses CSS scroll-behavior: smooth). */
export function resetHomeToFirstSection(
  root: HTMLElement,
  firstSectionId: string
): void {
  root.classList.remove('nuc-home-ready', 'nuc-home-booting')
  root.style.setProperty('--home-iris', '0%')

  const scroller = getScroller(root)
  const prevBehavior = scroller.style.scrollBehavior
  scroller.style.scrollBehavior = 'auto'

  const target = root.querySelector<HTMLElement>(`#${firstSectionId}`)
  if (target) {
    const top =
      target.getBoundingClientRect().top -
      scroller.getBoundingClientRect().top +
      scroller.scrollTop
    scroller.scrollTop = top
  } else {
    scroller.scrollTop = 0
  }

  scroller.style.scrollBehavior = prevBehavior
}

export type HomeScrollLoopOptions = {
  firstSectionId: string
  lastSectionId: string
  onLoop: () => void | Promise<void>
}

/**
 * On scroll past the last snap slide, instantly jump to the first section
 * and run onLoop (boot / refresh animation).
 */
export function bindHomeScrollLoop(
  root: HTMLElement,
  options: HomeScrollLoopOptions
): () => void {
  const scroller = getScroller(root)
  let locked = false
  let touchStartY = 0

  const runLoop = () => {
    if (locked) return
    locked = true

    // Jump first — before any async animation work.
    resetHomeToFirstSection(root, options.firstSectionId)

    void Promise.resolve(options.onLoop()).finally(() => {
      window.setTimeout(() => {
        locked = false
      }, 1200)
    })
  }

  const onWheel = (event: WheelEvent) => {
    if (locked || event.deltaY <= 0) return
    if (!isAtLastSlide(scroller, options.lastSectionId)) return

    event.preventDefault()
    runLoop()
  }

  const onTouchStart = (event: TouchEvent) => {
    touchStartY = event.touches[0]?.clientY ?? 0
  }

  const onTouchMove = (event: TouchEvent) => {
    if (locked) return
    const y = event.touches[0]?.clientY ?? touchStartY
    if (touchStartY - y < 24) return
    if (!isAtLastSlide(scroller, options.lastSectionId)) return

    event.preventDefault()
    runLoop()
  }

  scroller.addEventListener('wheel', onWheel, { passive: false })
  scroller.addEventListener('touchstart', onTouchStart, { passive: true })
  scroller.addEventListener('touchmove', onTouchMove, { passive: false })

  return () => {
    scroller.removeEventListener('wheel', onWheel)
    scroller.removeEventListener('touchstart', onTouchStart)
    scroller.removeEventListener('touchmove', onTouchMove)
  }
}
