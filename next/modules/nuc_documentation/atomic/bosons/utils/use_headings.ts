'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseHeadingsInterface {
  activeHeadingId: string
  scrollToHeading: (id: string) => void
  setupScrollTriggers: (contentRef: HTMLElement | null) => void
  cleanupScrollTriggers: () => void
}

const SEL = 'h2, h3, h4, h5, h6'
const LINE = 160

export function useHeadings(): UseHeadingsInterface {
  const [activeHeadingId, setActiveHeadingId] = useState<string>('')

  const state = useRef({
    root: null as HTMLElement | null,
    heads: [] as HTMLElement[],
    raf: 0,
    unsubs: [] as (() => void)[],
    mo: null as MutationObserver | null,
    seen: new Set<EventTarget>(),
  })

  const pull = useCallback(() => {
    const s = state.current
    s.heads = s.root
      ? Array.from(s.root.querySelectorAll<HTMLElement>(SEL)).filter(
          (h) => h.id
        )
      : []
  }, [])

  const apply = useCallback(() => {
    const s = state.current
    if (!s.heads.length) return
    let cur = s.heads[0]
    for (const h of s.heads) {
      if (h.getBoundingClientRect().top > LINE) break
      cur = h
    }
    setActiveHeadingId((prev) => (prev !== cur.id ? cur.id : prev))
  }, [])

  const schedule = useCallback(() => {
    const s = state.current
    if (!s.raf)
      s.raf = requestAnimationFrame(() => {
        s.raf = 0
        apply()
      })
  }, [apply])

  const bind = useCallback(
    (t: EventTarget) => {
      const s = state.current
      if (s.seen.has(t)) return
      s.seen.add(t)
      t.addEventListener('scroll', schedule, { passive: true })
      s.unsubs.push(() => {
        t.removeEventListener('scroll', schedule)
        s.seen.delete(t)
      })
    },
    [schedule]
  )

  const teardown = useCallback(() => {
    const s = state.current
    if (s.raf) cancelAnimationFrame(s.raf)
    s.raf = 0
    s.mo?.disconnect()
    s.mo = null
    s.unsubs.forEach((u) => u())
    s.unsubs.length = 0
    s.seen.clear()
    s.heads = []
    s.root = null
  }, [])

  const scrollToHeading = useCallback(
    (id: string) => {
      const el = document.getElementById(id)
      if (!el) return
      setActiveHeadingId(id)
      el.scrollIntoView({ block: 'start', behavior: 'auto' })
      requestAnimationFrame(() => requestAnimationFrame(apply))
    },
    [apply]
  )

  const setupScrollTriggers = useCallback(
    (contentRef: HTMLElement | null) => {
      teardown()
      const s = state.current
      s.root = contentRef
      if (!contentRef) return

      bind(window)
      bind(document)
      document.documentElement && bind(document.documentElement)
      document.scrollingElement && bind(document.scrollingElement)
      const vv = window.visualViewport
      if (vv) {
        vv.addEventListener('scroll', schedule, { passive: true })
        s.unsubs.push(() => vv.removeEventListener('scroll', schedule))
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

      const sync = () => {
        pull()
        if (!s.heads.length) {
          setActiveHeadingId('')
          return
        }
        apply()
      }

      sync()
      s.mo = new MutationObserver(() => {
        pull()
        if (!s.heads.length) setActiveHeadingId('')
        else apply()
      })
      s.mo.observe(contentRef, { childList: true, subtree: true })
      requestAnimationFrame(() => {
        sync()
        if (!s.heads.length) queueMicrotask(sync)
      })
    },
    [bind, schedule, apply, pull, teardown]
  )

  useEffect(() => {
    return () => teardown()
  }, [teardown])

  return {
    activeHeadingId,
    scrollToHeading,
    setupScrollTriggers,
    cleanupScrollTriggers: teardown,
  }
}
