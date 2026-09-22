import { scrollSectionOffset } from './scroll_section_offset'

const PROGRAMMATIC_ATTR = 'data-nuc-programmatic-scroll'

/** True while rail / CTA is driving the scroller (gate must not restore snap). */
export function isHomeProgrammaticScroll(scroller: HTMLElement): boolean {
  return scroller.getAttribute(PROGRAMMATIC_ATTR) === '1'
}

/**
 * Rail / CTA section jumps. Mandatory snap + CSS `scroll-behavior: smooth`
 * fight mid-flight and re-snap after land. Long jumps (e.g. ask → intro) use
 * instant scroll; short jumps stay smooth with snap held off until locked.
 */
export function scrollHomeSection(root: HTMLElement, sectionId: string): void {
  const scroller = root.querySelector<HTMLElement>('.nuc-home-scroller')
  const target = root.querySelector<HTMLElement>(`#${sectionId}`)
  if (!target) return

  if (!scroller) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }

  const top = scrollSectionOffset(scroller, target)
  const distance = Math.abs(scroller.scrollTop - top)
  // Long rail jumps land short then snap-correct — skip smooth for those.
  const useSmooth = distance <= scroller.clientHeight * 1.35
  const heldSnap = scroller.style.scrollSnapType
  const heldBehavior = scroller.style.scrollBehavior
  let done = false

  const restoreChrome = () => {
    scroller.removeAttribute(PROGRAMMATIC_ATTR)
    if (heldSnap) scroller.style.scrollSnapType = heldSnap
    else scroller.style.removeProperty('scroll-snap-type')
    // Keep behavior auto one frame after snap restore so any residual snap
    // settle is not animated by CSS scroll-behavior: smooth.
    requestAnimationFrame(() => {
      if (heldBehavior) scroller.style.scrollBehavior = heldBehavior
      else scroller.style.removeProperty('scroll-behavior')
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
  const scroller = root.querySelector<HTMLElement>('.nuc-home-scroller') ?? root

  const sections = sectionIds
    .map((id) => root.querySelector<HTMLElement>(`#${id}`))
    .filter((el): el is HTMLElement => Boolean(el))

  if (sections.length === 0) return () => undefined

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
    {
      root: scroller,
      threshold: [0.2, 0.35, 0.5, 0.65, 0.8],
    }
  )

  for (const section of sections) observer.observe(section)

  return () => observer.disconnect()
}
