import { scrollSectionOffset } from './scroll_section_offset'

const END_SLACK_PX = 8
/** Match `.nuc-home-panel` mobile `height: auto` (`$md: 768px`). */
const MOBILE_MQ = '(max-width: 767px)'

function getScroller(root: HTMLElement): HTMLElement {
  return root.querySelector<HTMLElement>('.nuc-home-scroller') ?? root
}

function panelList(scroller: HTMLElement): HTMLElement[] {
  return Array.from(
    scroller.querySelectorAll<HTMLElement>(':scope > .nuc-home-panel')
  )
}

/** Section whose start is at or above the current scroll top (leading snap page). */
function leadingSection(scroller: HTMLElement): HTMLElement | null {
  const panels = panelList(scroller)
  if (panels.length === 0) return null

  const top = scroller.scrollTop
  let current = panels[0]!
  for (const panel of panels) {
    const offset = scrollSectionOffset(scroller, panel)
    if (offset <= top + END_SLACK_PX) current = panel
    else break
  }
  return current
}

function sectionMaxScroll(scroller: HTMLElement, section: HTMLElement): number {
  const top = scrollSectionOffset(scroller, section)
  return Math.max(0, top + section.offsetHeight - scroller.clientHeight)
}

function isTallSection(scroller: HTMLElement, section: HTMLElement): boolean {
  return section.offsetHeight > scroller.clientHeight + END_SLACK_PX
}

function isPastSectionBottom(
  scroller: HTMLElement,
  section: HTMLElement
): boolean {
  return (
    scroller.scrollTop >= sectionMaxScroll(scroller, section) - END_SLACK_PX
  )
}

/**
 * Mobile snap gate for tall `.nuc-home-panel` sections only (home / investor,
 * Nuxt + Next). Short sections keep normal snap — no extra scroll.
 *
 * While mid tall section, CSS scroll-snap is disabled and overshoot is clamped
 * so one flick cannot both scroll within and advance.
 */
export function bindHomeSectionScrollGate(root: HTMLElement): () => void {
  const scroller = getScroller(root)
  const mq = window.matchMedia(MOBILE_MQ)
  let snapHeld = false
  const observedPanels = new WeakSet<Element>()

  const releaseSnap = () => {
    if (!snapHeld) return
    scroller.style.removeProperty('scroll-snap-type')
    snapHeld = false
  }

  const holdSnap = () => {
    if (snapHeld) return
    scroller.style.scrollSnapType = 'none'
    snapHeld = true
  }

  const resizeObserver = new ResizeObserver(() => {
    sync()
  })

  const observePanels = () => {
    for (const panel of panelList(scroller)) {
      if (observedPanels.has(panel)) continue
      observedPanels.add(panel)
      resizeObserver.observe(panel)
    }
  }

  const sync = () => {
    observePanels()

    if (!mq.matches) {
      releaseSnap()
      return
    }

    const section = leadingSection(scroller)
    if (
      section &&
      isTallSection(scroller, section) &&
      !isPastSectionBottom(scroller, section)
    ) {
      holdSnap()
      return
    }

    releaseSnap()
  }

  const onWheel = (event: WheelEvent) => {
    if (!mq.matches || event.deltaY <= 0) return

    const section = leadingSection(scroller)
    if (!section || !isTallSection(scroller, section)) return

    const max = sectionMaxScroll(scroller, section)
    if (scroller.scrollTop >= max - END_SLACK_PX) return

    // Clamp so one wheel tick cannot overshoot into the next section.
    if (scroller.scrollTop + event.deltaY > max) {
      event.preventDefault()
      holdSnap()
      scroller.scrollTop = max
      sync()
    }
  }

  let touchStartY = 0
  let touchStartScroll = 0

  const onTouchStart = (event: TouchEvent) => {
    touchStartY = event.touches[0]?.clientY ?? 0
    touchStartScroll = scroller.scrollTop
  }

  const onTouchMove = (event: TouchEvent) => {
    if (!mq.matches) return

    const y = event.touches[0]?.clientY ?? touchStartY
    const dy = touchStartY - y
    if (dy <= 0) return

    const section = leadingSection(scroller)
    if (!section || !isTallSection(scroller, section)) return

    const max = sectionMaxScroll(scroller, section)
    // Gesture began already at section bottom → allow snap / loop to proceed.
    if (touchStartScroll >= max - END_SLACK_PX) return

    if (touchStartScroll + dy <= max) return

    // Keep this gesture inside the section until finger lifts.
    event.preventDefault()
    holdSnap()
    scroller.scrollTop = max
  }

  const mutationObserver = new MutationObserver(() => {
    observePanels()
    sync()
  })
  mutationObserver.observe(scroller, { childList: true, subtree: false })

  scroller.addEventListener('scroll', sync, { passive: true })
  scroller.addEventListener('wheel', onWheel, { passive: false })
  scroller.addEventListener('touchstart', onTouchStart, { passive: true })
  scroller.addEventListener('touchmove', onTouchMove, { passive: false })
  mq.addEventListener('change', sync)
  resizeObserver.observe(scroller)
  observePanels()
  sync()

  return () => {
    releaseSnap()
    scroller.removeEventListener('scroll', sync)
    scroller.removeEventListener('wheel', onWheel)
    scroller.removeEventListener('touchstart', onTouchStart)
    scroller.removeEventListener('touchmove', onTouchMove)
    mq.removeEventListener('change', sync)
    resizeObserver.disconnect()
    mutationObserver.disconnect()
  }
}
