const PROGRAMMATIC_ATTR = 'data-nuc-programmatic-scroll'
const END_SLACK_PX = 12
const TALL_EXTRA_PX = 48
const MOBILE_MQ = '(max-width: 767px)'
const SNAP_CSS = 'y mandatory'

/** Scroll offset without getBoundingClientRect (sections are direct scroller children). */
export function scrollSectionOffset(
  scroller: HTMLElement,
  target: HTMLElement
): number {
  if (target.parentElement === scroller) return target.offsetTop

  let top = 0
  let node: HTMLElement | null = target
  while (node && node !== scroller) {
    top += node.offsetTop
    node = node.offsetParent as HTMLElement | null
    if (node && !scroller.contains(node)) break
  }
  return top
}

export function isProgrammaticScroll(scroller: HTMLElement): boolean {
  return scroller.getAttribute(PROGRAMMATIC_ATTR) === '1'
}

function getScroller(root: HTMLElement): HTMLElement {
  return root.querySelector<HTMLElement>('.nuc-scroller') ?? root
}

function panelsOf(scroller: HTMLElement): HTMLElement[] {
  return Array.from(
    scroller.querySelectorAll<HTMLElement>(':scope > .nuc-panel')
  )
}

function leadingSection(scroller: HTMLElement): HTMLElement | null {
  const panels = panelsOf(scroller)
  if (!panels.length) return null

  const top = scroller.scrollTop
  let current = panels[0]!
  for (const panel of panels) {
    if (scrollSectionOffset(scroller, panel) <= top + END_SLACK_PX)
      current = panel
    else break
  }
  return current
}

function sectionMaxScroll(scroller: HTMLElement, section: HTMLElement): number {
  return Math.max(
    0,
    scrollSectionOffset(scroller, section) +
      section.offsetHeight -
      scroller.clientHeight
  )
}

function isTall(scroller: HTMLElement, section: HTMLElement): boolean {
  return section.offsetHeight > scroller.clientHeight + TALL_EXTRA_PX
}

function atSectionBottom(scroller: HTMLElement, section: HTMLElement): boolean {
  return (
    scroller.scrollTop >= sectionMaxScroll(scroller, section) - END_SLACK_PX
  )
}

/**
 * Rail / CTA section jumps. Mandatory snap + CSS smooth fight mid-flight;
 * long jumps use instant scroll, short jumps stay smooth with snap held off.
 */
export function scrollSection(root: HTMLElement, sectionId: string): void {
  const scroller = root.querySelector<HTMLElement>('.nuc-scroller')
  const target = root.querySelector<HTMLElement>(`#${sectionId}`)
  if (!target) return

  if (!scroller) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }

  const top = scrollSectionOffset(scroller, target)
  const useSmooth =
    Math.abs(scroller.scrollTop - top) <= scroller.clientHeight * 1.35
  let done = false

  const restoreChrome = () => {
    scroller.removeAttribute(PROGRAMMATIC_ATTR)
    scroller.style.removeProperty('scroll-snap-type')
    requestAnimationFrame(() => {
      scroller.style.removeProperty('scroll-behavior')
    })
  }

  const finish = () => {
    if (done) return
    done = true
    scroller.removeEventListener('scrollend', finish)
    scroller.style.scrollBehavior = 'auto'
    scroller.scrollTop = top
    requestAnimationFrame(() => {
      scroller.scrollTop = top
      requestAnimationFrame(() => {
        scroller.scrollTop = top
        restoreChrome()
      })
    })
  }

  scroller.setAttribute(PROGRAMMATIC_ATTR, '1')
  scroller.style.scrollSnapType = 'none'
  scroller.style.scrollBehavior = 'auto'

  if (!useSmooth) {
    scroller.scrollTop = top
    finish()
    return
  }

  scroller.addEventListener('scrollend', finish)
  window.setTimeout(finish, 900)
  scroller.scrollTo({ top, behavior: 'smooth' })
}

export function observeActiveSection(
  root: HTMLElement,
  sectionIds: readonly string[],
  onChange: (id: string) => void
): () => void {
  const scroller = getScroller(root)
  const sections = sectionIds
    .map((id) => root.querySelector<HTMLElement>(`#${id}`))
    .filter((el): el is HTMLElement => Boolean(el))

  if (!sections.length) return () => undefined

  let activeId = sections[0]?.id ?? sectionIds[0] ?? ''
  onChange(activeId)

  const ratios = new Map<string, number>()
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        ratios.set(entry.target.id, entry.intersectionRatio)
      }
      let nextId = activeId
      let best = -1
      for (const section of sections) {
        const ratio = ratios.get(section.id) ?? 0
        if (ratio > best) {
          best = ratio
          nextId = section.id
        }
      }
      if (nextId && nextId !== activeId) {
        activeId = nextId
        onChange(activeId)
      }
    },
    { root: scroller, threshold: [0.2, 0.35, 0.5, 0.65, 0.8] }
  )

  for (const section of sections) observer.observe(section)
  return () => observer.disconnect()
}

/** Resolves when `.nuc-ready` is present (intro boot finished). */
function isShellReady(root: HTMLElement): boolean {
  return root.classList.contains('nuc-ready')
}

export function whenShellReady(root: HTMLElement): Promise<void> {
  if (isShellReady(root)) return Promise.resolve()

  return new Promise((resolve) => {
    const done = () => {
      mo.disconnect()
      window.clearTimeout(safety)
      resolve()
    }
    const mo = new MutationObserver(() => {
      if (isShellReady(root)) done()
    })
    mo.observe(root, { attributes: true, attributeFilter: ['class'] })
    const safety = window.setTimeout(done, 4000)
  })
}

/**
 * Mobile snap gate for tall `.nuc-panel` sections only.
 * Mid tall section → snap off; at/past bottom (or short) → snap on.
 */
export function bindSectionScrollGate(root: HTMLElement): () => void {
  const scroller = getScroller(root)
  const mq = window.matchMedia(MOBILE_MQ)
  let snapHeld = false
  const observedPanels = new WeakSet<Element>()

  const applySnap = (on: boolean) => {
    const next = on ? SNAP_CSS : 'none'
    if (scroller.style.scrollSnapType === next && snapHeld === !on) return
    scroller.style.scrollSnapType = next
    snapHeld = !on
  }

  const resizeObserver = new ResizeObserver(() => sync())

  const observePanels = () => {
    for (const panel of panelsOf(scroller)) {
      if (observedPanels.has(panel)) continue
      observedPanels.add(panel)
      resizeObserver.observe(panel)
    }
  }

  const sync = () => {
    if (root.classList.contains('nuc-booting')) {
      return
    }
    observePanels()
    if (isProgrammaticScroll(scroller)) return

    if (!mq.matches) {
      scroller.style.removeProperty('scroll-snap-type')
      snapHeld = false
      return
    }

    const section = leadingSection(scroller)
    const hold =
      Boolean(section) &&
      isTall(scroller, section!) &&
      !atSectionBottom(scroller, section!)
    applySnap(!hold)
  }

  const clampDownGesture = (
    delta: number,
    fromScroll: number,
    prevent: () => void
  ) => {
    if (!mq.matches || delta <= 0) return
    const section = leadingSection(scroller)
    if (!section || !isTall(scroller, section)) return

    const max = sectionMaxScroll(scroller, section)
    if (fromScroll >= max - END_SLACK_PX) {
      applySnap(true)
      return
    }
    if (fromScroll + delta <= max) return

    prevent()
    applySnap(false)
    scroller.scrollTop = max
    applySnap(true)
  }

  let touchStartY = 0
  let touchStartScroll = 0

  const onWheel = (event: WheelEvent) => {
    clampDownGesture(event.deltaY, scroller.scrollTop, () =>
      event.preventDefault()
    )
  }

  const onTouchStart = (event: TouchEvent) => {
    touchStartY = event.touches[0]?.clientY ?? 0
    touchStartScroll = scroller.scrollTop
    sync()
  }

  const onTouchMove = (event: TouchEvent) => {
    const y = event.touches[0]?.clientY ?? touchStartY
    clampDownGesture(touchStartY - y, touchStartScroll, () =>
      event.preventDefault()
    )
  }

  const mutationObserver = new MutationObserver(() => {
    observePanels()
    sync()
  })
  mutationObserver.observe(scroller, {
    childList: true,
    subtree: false,
    attributes: true,
    attributeFilter: [PROGRAMMATIC_ATTR],
  })

  const listeners: Array<[string, EventListener, AddEventListenerOptions?]> = [
    ['scroll', sync, { passive: true }],
    ['scrollend', sync, { passive: true }],
    ['wheel', onWheel as EventListener, { passive: false }],
    ['touchstart', onTouchStart as EventListener, { passive: true }],
    ['touchmove', onTouchMove as EventListener, { passive: false }],
    ['touchend', sync, { passive: true }],
    ['touchcancel', sync, { passive: true }],
  ]
  for (const [type, handler, opts] of listeners) {
    scroller.addEventListener(type, handler, opts)
  }
  mq.addEventListener('change', sync)
  resizeObserver.observe(scroller)
  observePanels()
  sync()

  return () => {
    scroller.style.removeProperty('scroll-snap-type')
    snapHeld = false
    for (const [type, handler] of listeners) {
      scroller.removeEventListener(type, handler)
    }
    mq.removeEventListener('change', sync)
    resizeObserver.disconnect()
    mutationObserver.disconnect()
  }
}
