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

/** @deprecated Prefer `isProgrammaticScroll`. */
export const isHomeProgrammaticScroll = isProgrammaticScroll

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

/** 0-based index of the panel currently pinned to the scroller top. */
export function activeSlideIndex(root: HTMLElement): number {
  const scroller = getScroller(root)
  const panels = panelsOf(scroller)
  if (!panels.length) return 0
  const top = scroller.scrollTop
  let idx = 0
  for (let i = 0; i < panels.length; i++) {
    if (scrollSectionOffset(scroller, panels[i]!) <= top + END_SLACK_PX) idx = i
    else break
  }
  return idx
}

/** Freeze scroller so DOM reorder cannot scroll-anchor to a moved section. */
export function freezeScrollerForReorder(root: HTMLElement): void {
  const scroller = root.querySelector<HTMLElement>('.nuc-scroller')
  if (!scroller) return
  scroller.setAttribute(PROGRAMMATIC_ATTR, '1')
  scroller.style.overflowAnchor = 'none'
  scroller.style.scrollBehavior = 'auto'
  scroller.style.scrollSnapType = 'none'
}

/** Restore scroller chrome after a held freeze (append hard-cut). */
export function unfreezeScroller(root: HTMLElement): void {
  const scroller = root.querySelector<HTMLElement>('.nuc-scroller')
  if (!scroller) return
  scroller.removeAttribute(PROGRAMMATIC_ATTR)
  scroller.style.removeProperty('scroll-snap-type')
  scroller.style.removeProperty('scroll-behavior')
}

/** Jump to a slide by index without smooth scroll (keeps live-reorder steady). */
export function scrollToSlideIndex(
  root: HTMLElement,
  index: number,
  options?: { holdFreeze?: boolean }
): void {
  const scroller = root.querySelector<HTMLElement>('.nuc-scroller')
  if (!scroller) return
  const panels = panelsOf(scroller)
  if (!panels.length) return
  const panel = panels[Math.max(0, Math.min(index, panels.length - 1))]
  if (!panel) return
  freezeScrollerForReorder(root)
  scroller.scrollTop = scrollSectionOffset(scroller, panel)
  if (options?.holdFreeze) return
  requestAnimationFrame(() => {
    unfreezeScroller(root)
  })
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

/** Resolve a panel by CMS `data-section-id` or semantic DOM `#id` / `#anchor`. */
export function findSectionEl(
  root: HTMLElement,
  sectionId: string
): HTMLElement | null {
  const safe =
    typeof CSS !== 'undefined' && typeof CSS.escape === 'function'
      ? CSS.escape(sectionId)
      : sectionId.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  return (
    root.querySelector<HTMLElement>(`[data-section-id="${safe}"]`) ||
    root.querySelector<HTMLElement>(`#${safe}`)
  )
}

/** Scroll the marketing frame to a section id (CTA / next helpers). */
export function scrollFrameTo(sectionId: string): void {
  if (!import.meta.client) return
  const root = document.querySelector<HTMLElement>('.nuc-frame')
  if (!root) return
  scrollSection(root, sectionId)
}

/**
 * Rail / CTA section jumps. Mandatory snap + CSS smooth fight mid-flight;
 * long jumps use instant scroll, short jumps stay smooth with snap held off.
 */
export function scrollSection(root: HTMLElement, sectionId: string): void {
  const scroller = root.querySelector<HTMLElement>('.nuc-scroller')
  const target = findSectionEl(root, sectionId)
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
  onChange: (id: string) => void,
  options?: { initialId?: string | null }
): () => void {
  const scroller = getScroller(root)
  const sections = sectionIds
    .map((id) => {
      const el = findSectionEl(root, id)
      return el ? { id, el } : null
    })
    .filter((row): row is { id: string; el: HTMLElement } => Boolean(row))

  if (!sections.length) return () => undefined

  const preferred = options?.initialId
  let activeId =
    preferred && sections.some((row) => row.id === preferred)
      ? preferred
      : (sections[0]?.id ?? sectionIds[0] ?? '')
  onChange(activeId)

  const ratios = new Map<Element, number>()
  const pickFromScroll = (): string | null => {
    const lead = leadingSection(scroller)
    if (!lead) return null
    return sections.find((row) => row.el === lead)?.id ?? null
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        ratios.set(entry.target, entry.intersectionRatio)
      }
      let nextId = activeId
      let best = -1
      for (const row of sections) {
        // Missing entries stay undefined — do not treat as 0 (that made the
        // first cold callback always pick sections[0] / Intro).
        if (!ratios.has(row.el)) continue
        const ratio = ratios.get(row.el) ?? 0
        if (ratio > best) {
          best = ratio
          nextId = row.id
        }
      }
      // Soft rebind / programmatic scroll often reports all zeros first —
      // keep preferred, or fall back to the panel pinned at scrollTop.
      if (best <= 0) {
        const fromScroll = pickFromScroll()
        if (fromScroll) nextId = fromScroll
        else return
      }
      if (nextId && nextId !== activeId) {
        activeId = nextId
        onChange(activeId)
      }
    },
    { root: scroller, threshold: [0.2, 0.35, 0.5, 0.65, 0.8] }
  )

  for (const row of sections) observer.observe(row.el)
  return () => observer.disconnect()
}

/** Resolves when `.nuc-ready` is present (intro boot finished). */
function isShellReady(root: HTMLElement): boolean {
  return root.classList.contains('nuc-ready')
}

export function whenFrameReady(root: HTMLElement): Promise<void> {
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

/** @deprecated Prefer `whenFrameReady`. */
export const whenHomeReady = whenFrameReady

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
