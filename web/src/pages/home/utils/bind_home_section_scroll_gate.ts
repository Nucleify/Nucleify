import { isHomeProgrammaticScroll } from './observe_active_section'
import { scrollSectionOffset } from './scroll_section_offset'

const END_SLACK_PX = 12
/** Only gate when clearly taller than one viewport - near-fit panels stay snappy. */
const TALL_EXTRA_PX = 48
/** Match `.nuc-home-panel` mobile `height: auto` (`$md: 768px`). */
const MOBILE_MQ = '(max-width: 767px)'
/** Stylesheet default - never persist inline `none` from a prior hold. */
const SNAP_CSS = 'y mandatory'

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
  return section.offsetHeight > scroller.clientHeight + TALL_EXTRA_PX
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
 * Mobile snap gate for tall `.nuc-home-panel` sections only (home / investor).
 *
 * Mid tall section → snap off so content can scroll.
 * At/ past section bottom (or short sections) → snap **must** be on so the
 * next flick always advances to the following slide.
 */
export function bindHomeSectionScrollGate(root: HTMLElement): () => void {
  const scroller = getScroller(root)
  const mq = window.matchMedia(MOBILE_MQ)
  let snapHeld = false
  const observedPanels = new WeakSet<Element>()

  const applySnap = (on: boolean) => {
    if (on) {
      // Always write the CSS value - removeProperty alone can leave a stale
      // inline `none` from rail/loop restores that blocked section slides.
      if (scroller.style.scrollSnapType === SNAP_CSS && !snapHeld) return
      scroller.style.scrollSnapType = SNAP_CSS
      snapHeld = false
      return
    }
    if (scroller.style.scrollSnapType === 'none' && snapHeld) return
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
    if (root.classList.contains('nuc-home-booting')) return

    observePanels()

    if (isHomeProgrammaticScroll(scroller)) return

    if (!mq.matches) {
      scroller.style.removeProperty('scroll-snap-type')
      snapHeld = false
      return
    }

    const section = leadingSection(scroller)
    const hold =
      Boolean(section) &&
      isTallSection(scroller, section!) &&
      !isPastSectionBottom(scroller, section!)

    applySnap(!hold)
  }

  const onWheel = (event: WheelEvent) => {
    if (!mq.matches || event.deltaY <= 0) return

    const section = leadingSection(scroller)
    if (!section || !isTallSection(scroller, section)) return

    const max = sectionMaxScroll(scroller, section)
    if (scroller.scrollTop >= max - END_SLACK_PX) {
      // At bottom - ensure snap is on before this wheel can advance.
      applySnap(true)
      return
    }

    if (scroller.scrollTop + event.deltaY > max) {
      event.preventDefault()
      applySnap(false)
      scroller.scrollTop = max
      // Next gesture should snap to the following section.
      applySnap(true)
    }
  }

  let touchStartY = 0
  let touchStartScroll = 0

  const onTouchStart = (event: TouchEvent) => {
    touchStartY = event.touches[0]?.clientY ?? 0
    touchStartScroll = scroller.scrollTop
    // If the finger goes down already at a tall-section bottom, snap must be on.
    sync()
  }

  const onTouchMove = (event: TouchEvent) => {
    if (!mq.matches) return

    const y = event.touches[0]?.clientY ?? touchStartY
    const dy = touchStartY - y
    if (dy <= 0) return

    const section = leadingSection(scroller)
    if (!section || !isTallSection(scroller, section)) return

    const max = sectionMaxScroll(scroller, section)
    if (touchStartScroll >= max - END_SLACK_PX) {
      applySnap(true)
      return
    }

    if (touchStartScroll + dy <= max) return

    event.preventDefault()
    applySnap(false)
    scroller.scrollTop = max
  }

  const onTouchEnd = () => {
    // After the gesture, land snap state for the *next* flick.
    sync()
  }

  const mutationObserver = new MutationObserver(() => {
    observePanels()
    sync()
  })
  mutationObserver.observe(scroller, {
    childList: true,
    subtree: false,
    attributes: true,
    attributeFilter: ['data-nuc-programmatic-scroll'],
  })

  scroller.addEventListener('scroll', sync, { passive: true })
  scroller.addEventListener('scrollend', sync, { passive: true })
  scroller.addEventListener('wheel', onWheel, { passive: false })
  scroller.addEventListener('touchstart', onTouchStart, { passive: true })
  scroller.addEventListener('touchmove', onTouchMove, { passive: false })
  scroller.addEventListener('touchend', onTouchEnd, { passive: true })
  scroller.addEventListener('touchcancel', onTouchEnd, { passive: true })
  mq.addEventListener('change', sync)
  resizeObserver.observe(scroller)
  observePanels()
  sync()

  return () => {
    scroller.style.removeProperty('scroll-snap-type')
    snapHeld = false
    scroller.removeEventListener('scroll', sync)
    scroller.removeEventListener('scrollend', sync)
    scroller.removeEventListener('wheel', onWheel)
    scroller.removeEventListener('touchstart', onTouchStart)
    scroller.removeEventListener('touchmove', onTouchMove)
    scroller.removeEventListener('touchend', onTouchEnd)
    scroller.removeEventListener('touchcancel', onTouchEnd)
    mq.removeEventListener('change', sync)
    resizeObserver.disconnect()
    mutationObserver.disconnect()
  }
}
