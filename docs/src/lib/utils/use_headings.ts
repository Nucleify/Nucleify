import { onUnmounted, ref } from 'vue'

export interface UseHeadingsInterface {
  activeHeadingId: ReturnType<typeof ref<string>>
  scrollToHeading: (id: string) => void
  setupScrollTriggers: (contentRef: HTMLElement | null) => void
  cleanupScrollTriggers: () => void
}

const SEL = 'h2, h3, h4, h5, h6'
const LINE = 160

export function useHeadings(): UseHeadingsInterface {
  const activeHeadingId = ref('')
  let root: HTMLElement | null = null
  let heads: HTMLElement[] = []
  let raf = 0
  const unsubs: (() => void)[] = []
  let mo: MutationObserver | null = null
  const seen = new Set<EventTarget>()

  function pull(): void {
    heads = root
      ? Array.from(root.querySelectorAll<HTMLElement>(SEL)).filter((h) => h.id)
      : []
  }

  function apply(): void {
    if (!heads.length) return
    let cur = heads[0]
    for (const h of heads) {
      if (h.getBoundingClientRect().top > LINE) break
      cur = h
    }
    if (cur.id !== activeHeadingId.value) activeHeadingId.value = cur.id
  }

  function schedule(): void {
    if (!raf)
      raf = requestAnimationFrame(() => {
        raf = 0
        apply()
      })
  }

  function bind(t: EventTarget): void {
    if (seen.has(t)) return
    seen.add(t)
    t.addEventListener('scroll', schedule, { passive: true })
    unsubs.push(() => {
      t.removeEventListener('scroll', schedule)
      seen.delete(t)
    })
  }

  function teardown(): void {
    if (raf) cancelAnimationFrame(raf)
    raf = 0
    mo?.disconnect()
    mo = null
    unsubs.forEach((u) => u())
    unsubs.length = 0
    seen.clear()
    heads = []
    root = null
  }

  function scrollToHeading(id: string): void {
    const el = document.getElementById(id)
    if (!el) return
    activeHeadingId.value = id
    el.scrollIntoView({ block: 'start', behavior: 'auto' })
    requestAnimationFrame(() => requestAnimationFrame(apply))
  }

  function setupScrollTriggers(contentRef: HTMLElement | null): void {
    teardown()
    root = contentRef
    if (!contentRef) return

    bind(window)
    bind(document)
    document.documentElement && bind(document.documentElement)
    document.scrollingElement && bind(document.scrollingElement)
    const vv = window.visualViewport
    if (vv) {
      vv.addEventListener('scroll', schedule, { passive: true })
      unsubs.push(() => vv.removeEventListener('scroll', schedule))
    }
    for (let p: HTMLElement | null = contentRef; p; p = p.parentElement) {
      const { overflowY } = getComputedStyle(p)
      if (
        /(auto|scroll|overlay)/.test(overflowY) &&
        p.scrollHeight > p.clientHeight + 1
      ) {
        bind(p)
      }
    }

    const sync = (): void => {
      pull()
      if (!heads.length) {
        activeHeadingId.value = ''
        return
      }
      apply()
    }

    sync()
    mo = new MutationObserver(() => {
      pull()
      if (!heads.length) activeHeadingId.value = ''
      else apply()
    })
    mo.observe(contentRef, { childList: true, subtree: true })
    requestAnimationFrame(() => {
      sync()
      if (!heads.length) queueMicrotask(sync)
    })
  }

  onUnmounted(teardown)

  return {
    activeHeadingId,
    scrollToHeading,
    setupScrollTriggers,
    cleanupScrollTriggers: teardown,
  }
}
