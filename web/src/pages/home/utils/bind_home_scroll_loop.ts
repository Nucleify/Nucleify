import { scrollSectionOffset } from './scroll_section_offset'

const END_SLACK_PX = 8
const TOUCH_PULL_PX = 56
const LOOP_LOCK_MS = 1200

function getScroller(root: HTMLElement): HTMLElement {
  return root.querySelector<HTMLElement>('.nuc-home-scroller') ?? root
}

function nextFrame(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => resolve())
  })
}

function isScrollerAtEnd(scroller: HTMLElement): boolean {
  return (
    scroller.scrollTop + scroller.clientHeight >=
    scroller.scrollHeight - END_SLACK_PX
  )
}

function isSectionCoveringViewport(
  scroller: HTMLElement,
  section: HTMLElement,
  minShare: number
): boolean {
  const top = scrollSectionOffset(scroller, section)
  const bottom = top + section.offsetHeight
  const viewTop = scroller.scrollTop
  const viewBottom = viewTop + scroller.clientHeight
  const visible = Math.min(viewBottom, bottom) - Math.max(viewTop, top)
  if (visible <= 0) return false
  return visible >= scroller.clientHeight * minShare
}

function isAtLastSlide(
  root: HTMLElement,
  scroller: HTMLElement,
  lastSectionId: string
): boolean {
  const section = root.querySelector<HTMLElement>(`#${lastSectionId}`)
  if (!section) return false
  return (
    isScrollerAtEnd(scroller) &&
    isSectionCoveringViewport(scroller, section, 0.45)
  )
}

function isAtFirstSection(
  root: HTMLElement,
  scroller: HTMLElement,
  firstSectionId: string
): boolean {
  const section = root.querySelector<HTMLElement>(`#${firstSectionId}`)
  if (!section) return scroller.scrollTop <= END_SLACK_PX
  return (
    Math.abs(scroller.scrollTop - scrollSectionOffset(scroller, section)) <= 16
  )
}

function restoreScrollerChrome(
  scroller: HTMLElement,
  snap: string,
  behavior: string
): void {
  scroller.style.scrollSnapType = snap
  scroller.style.scrollBehavior = behavior
}

async function jumpToFirstSection(
  root: HTMLElement,
  scroller: HTMLElement,
  firstSectionId: string
): Promise<boolean> {
  const target = root.querySelector<HTMLElement>(`#${firstSectionId}`)
  const top = target ? scrollSectionOffset(scroller, target) : 0
  scroller.scrollTop = top
  await nextFrame()
  scroller.scrollTop = top
  await nextFrame()
  return isAtFirstSection(root, scroller, firstSectionId)
}

function withSnapDisabled(
  scroller: HTMLElement,
  task: () => Promise<void>
): Promise<void> {
  const prevSnap = scroller.style.scrollSnapType
  const prevBehavior = scroller.style.scrollBehavior
  scroller.style.scrollSnapType = 'none'
  scroller.style.scrollBehavior = 'auto'
  return task().finally(() => {
    restoreScrollerChrome(scroller, prevSnap, prevBehavior)
  })
}

/** Jump to first slide immediately (bypasses CSS scroll-behavior: smooth). */
export async function resetHomeToFirstSection(
  root: HTMLElement,
  firstSectionId: string
): Promise<boolean> {
  const scroller = getScroller(root)
  let landed = false
  await withSnapDisabled(scroller, async () => {
    landed = await jumpToFirstSection(root, scroller, firstSectionId)
  })
  return landed
}

export type HomeScrollLoopOptions = {
  firstSectionId: string
  lastSectionId: string
  onLoop: () => void | Promise<void>
}

/**
 * On scroll past the last snap slide, instantly jump to the first section
 * and run onLoop (boot / refresh animation).
 *
 * Touch waits for touchend — iOS ignores scrollTop while a finger is down,
 * which left the rail/boot on intro while the scroller stayed on the last slide.
 */
export function bindHomeScrollLoop(
  root: HTMLElement,
  options: HomeScrollLoopOptions
): () => void {
  const scroller = getScroller(root)
  let locked = false
  let touchStartY = 0
  let pullingPastEnd = false

  const runLoop = () => {
    if (locked) return
    locked = true
    pullingPastEnd = false

    void withSnapDisabled(scroller, async () => {
      const landed = await jumpToFirstSection(
        root,
        scroller,
        options.firstSectionId
      )
      if (!landed) return
      await Promise.resolve(options.onLoop())
      await jumpToFirstSection(root, scroller, options.firstSectionId)
    }).finally(() => {
      const target = root.querySelector<HTMLElement>(
        `#${options.firstSectionId}`
      )
      scroller.scrollTop = target ? scrollSectionOffset(scroller, target) : 0
      window.setTimeout(() => {
        locked = false
      }, LOOP_LOCK_MS)
    })
  }

  const onWheel = (event: WheelEvent) => {
    if (locked || event.deltaY <= 0) return
    if (!isAtLastSlide(root, scroller, options.lastSectionId)) return

    event.preventDefault()
    runLoop()
  }

  const onTouchStart = (event: TouchEvent) => {
    touchStartY = event.touches[0]?.clientY ?? 0
    pullingPastEnd = false
  }

  const onTouchMove = (event: TouchEvent) => {
    if (locked) return
    const y = event.touches[0]?.clientY ?? touchStartY
    if (touchStartY - y < TOUCH_PULL_PX) return
    if (!isAtLastSlide(root, scroller, options.lastSectionId)) return

    pullingPastEnd = true
    event.preventDefault()
  }

  const onTouchCancel = () => {
    pullingPastEnd = false
  }

  const onTouchEnd = () => {
    if (locked || !pullingPastEnd) {
      pullingPastEnd = false
      return
    }
    pullingPastEnd = false
    if (!isAtLastSlide(root, scroller, options.lastSectionId)) return

    // Let the browser release the pan before changing scrollTop.
    void nextFrame()
      .then(() => nextFrame())
      .then(() => {
        if (locked) return
        if (!isAtLastSlide(root, scroller, options.lastSectionId)) return
        runLoop()
      })
  }

  scroller.addEventListener('wheel', onWheel, { passive: false })
  scroller.addEventListener('touchstart', onTouchStart, { passive: true })
  scroller.addEventListener('touchmove', onTouchMove, { passive: false })
  scroller.addEventListener('touchend', onTouchEnd)
  scroller.addEventListener('touchcancel', onTouchCancel)

  return () => {
    scroller.removeEventListener('wheel', onWheel)
    scroller.removeEventListener('touchstart', onTouchStart)
    scroller.removeEventListener('touchmove', onTouchMove)
    scroller.removeEventListener('touchend', onTouchEnd)
    scroller.removeEventListener('touchcancel', onTouchCancel)
  }
}
