import type { TweenParamValue } from 'animejs'
import { isAutomatedAudit } from '../../home/utils/is_automated_audit'

type Revertible = {
  revert?: () => unknown
  pause?: () => unknown
  cancel?: () => unknown
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function isQuietBoot(): boolean {
  return prefersReducedMotion() || isAutomatedAudit()
}

function q(root: HTMLElement, selector: string): HTMLElement | null {
  return root.querySelector(selector)
}

function qa(root: HTMLElement, selector: string): HTMLElement[] {
  return Array.from(root.querySelectorAll(selector))
}

const WIPE_SHIFT = -28
const WIPE_SKEW = -10

/** Cards with border glow - CSS mask clips box-shadow and chops 1px borders. */
function isChromeCard(item: HTMLElement): boolean {
  const shadow = getComputedStyle(item).boxShadow
  return Boolean(shadow && shadow !== 'none')
}

function prepareFadeWipe(item: HTMLElement): void {
  // Same wipe as home: translate + skew curve (mask skipped on chrome cards).
  item.style.opacity = '0'
  item.style.transform = `translate3d(${WIPE_SHIFT}px, 0, 0) skewX(${WIPE_SKEW}deg)`
  item.style.removeProperty('clip-path')
  item.style.removeProperty('filter')
  item.style.removeProperty('box-shadow')

  if (isChromeCard(item)) {
    // Slide/skew only - keep border + glow painted for the whole enter.
    item.classList.remove('nuc-home-anim-mask')
    item.style.removeProperty('--home-wipe')
    item.style.transition = 'none'
    return
  }

  item.classList.add('nuc-home-anim-mask')
  item.style.setProperty('--home-wipe', '0')
}

function fadeWipeAnimation(duration: number, delay: TweenParamValue) {
  return {
    '--home-wipe': [0, 1],
    opacity: [0, 1],
    x: [WIPE_SHIFT, 0],
    skewX: [WIPE_SKEW, 0],
    duration,
    delay,
    ease: 'outExpo' as const,
  }
}

function clearFadeWipe(item: HTMLElement): void {
  item.classList.remove('nuc-home-anim-mask')
  item.style.removeProperty('--home-wipe')
  item.style.removeProperty('mask-image')
  item.style.removeProperty('-webkit-mask-image')
  item.style.clipPath = 'none'
  item.style.filter = 'none'
  item.style.transform = 'none'
  item.style.opacity = '1'
  item.style.removeProperty('box-shadow')
  item.style.removeProperty('transition')
}

function track(
  cleanups: Array<() => void>,
  item: Revertible | null | undefined
): void {
  if (!item) return
  cleanups.push(() => {
    try {
      item.pause?.()
      item.cancel?.()
      item.revert?.()
    } catch {
      /* noop */
    }
  })
}

function setVar(el: HTMLElement, name: string, value: string): void {
  el.style.setProperty(name, value)
}

/** CSS defaults only - no layout reads (avoids boot forced reflow). */
function setIrisOrigin(root: HTMLElement, compact: boolean): void {
  if (!compact) {
    setVar(root, '--home-iris-x', '18%')
    setVar(root, '--home-iris-y', '40%')
    return
  }
  setVar(root, '--home-iris-x', '12%')
  setVar(root, '--home-iris-y', '18%')
}

function clearMotionStyles(el: HTMLElement | null | undefined): void {
  if (!el) return
  el.style.removeProperty('opacity')
  el.style.removeProperty('filter')
  el.style.removeProperty('transform')
  el.style.removeProperty('clip-path')
  el.style.removeProperty('--home-wipe')
  el.style.removeProperty('mask-image')
  el.style.removeProperty('-webkit-mask-image')
  el.style.removeProperty('translate')
  el.style.removeProperty('rotate')
  el.style.removeProperty('scale')
  el.classList.remove('nuc-home-anim-mask')
}

function settleHeroBits(items: HTMLElement[]): void {
  for (const item of items) {
    clearMotionStyles(item)
    item.style.opacity = '1'
  }
}

function warmBrandFonts(): void {
  void Promise.all([
    document.fonts.load("700 4rem 'JetBrains Mono'"),
    document.fonts.load("600 4rem 'JetBrains Mono'"),
  ]).catch(() => {
    /* fallback stack is fine */
  })
}

/**
 * Investor motion - iris boot, cipher brand, shear, wipe reveals.
 * Slimmer than home: no lattice / terminal / compiler stages.
 */
export async function playInvestorAnimations(
  root: HTMLElement
): Promise<() => void> {
  const cleanups: Array<() => void> = []
  let heroBooted = false

  const finishBoot = () => {
    root.classList.remove('nuc-home-booting')
    root.classList.add('nuc-home-ready')
    heroBooted = true
  }

  root.classList.add('nuc-home-booting')

  if (isQuietBoot()) {
    setVar(root, '--home-iris', '165%')
    setVar(root, '--home-iris-x', '18%')
    setVar(root, '--home-iris-y', '40%')
    finishBoot()
    return () => {
      root.classList.remove('nuc-home-ready', 'nuc-home-booting')
    }
  }

  let animate: typeof import('animejs').animate
  let createTimeline: typeof import('animejs').createTimeline
  let stagger: typeof import('animejs').stagger
  try {
    ;({ animate, createTimeline, stagger } = await import('animejs'))
  } catch {
    setVar(root, '--home-iris', '165%')
    finishBoot()
    return () => {
      root.classList.remove('nuc-home-ready', 'nuc-home-booting')
    }
  }

  warmBrandFonts()

  const scroller = q(root, '.nuc-home-scroller') ?? root
  const compact = window.matchMedia('(max-width: 960px)').matches
  const rail = q(root, '.nuc-home-rail')
  const eyebrow = q(root, '.nuc-home-hero-eyebrow')
  const mark = q(root, '.nuc-home-hero-mark')
  const brand = q(root, '.nuc-home-hero-brand')
  const headline = q(root, '.nuc-home-hero-headline')
  const support = q(root, '.nuc-home-hero-support')
  const cta = q(root, '.nuc-home-hero-cta')
  // Same target shape as home: the hero panel (cube + readout live inside).
  const panel = q(root, '.nuc-home-hero-panel')

  for (const el of [
    rail,
    eyebrow,
    mark,
    brand,
    headline,
    support,
    panel,
    cta,
    ...qa(root, '.nuc-home-anim-mask'),
  ]) {
    clearMotionStyles(el)
  }

  // Identical prep to home hero assemble (headline/support/CTA row = fade-wipe).
  if (!compact) {
    for (const el of [rail, eyebrow, mark, panel]) {
      if (el) el.style.opacity = '0'
    }
    if (headline) prepareFadeWipe(headline)
    if (support) prepareFadeWipe(support)
    if (cta) prepareFadeWipe(cta)
  }

  // Same cipher path as home: wipe Vue glyph spans and rebuild. Mutating
  // `.nuc-home-hero-brand-ch` in place gets overwritten by Vue and looks static.
  const finalBrand = brand?.textContent?.trim() || 'Nucleify'
  const glyphs = '01<>{}[]/\\|#$%#_entropynucleus'
  if (brand && !compact) {
    const startCipher = () => {
      brand.textContent = ''
      brand.setAttribute('aria-label', finalBrand)
      brand.classList.add('is-decoding')

      let lockedCount = 0
      let settled = false
      const settleBrand = () => {
        if (settled) return
        settled = true
        brand.classList.remove('is-decoding')
      }

      const lockGlyph = (slot: HTMLSpanElement, char: string) => {
        if (slot.classList.contains('is-locked')) return
        slot.textContent = char === ' ' ? '\u00a0' : char
        slot.classList.add('is-locked')
        lockedCount += 1
        if (lockedCount >= finalBrand.length) settleBrand()
      }

      finalBrand.split('').forEach((char, index) => {
        const slot = document.createElement('span')
        slot.className = 'nuc-home-hero-glyph'
        slot.textContent =
          glyphs[Math.floor(Math.random() * glyphs.length)] || '·'
        brand.appendChild(slot)

        const state = { p: 0 }
        track(
          cleanups,
          animate(state, {
            p: 1,
            duration: 780 + index * 60,
            delay: 160 + index * 48,
            ease: 'outExpo',
            onUpdate: () => {
              if (state.p > 0.86) {
                lockGlyph(slot, char)
                return
              }
              if (slot.classList.contains('is-locked')) return
              slot.textContent =
                glyphs[Math.floor(Math.random() * glyphs.length)] || '·'
            },
            onComplete: () => lockGlyph(slot, char),
          })
        )
      })

      const settleTimer = window.setTimeout(settleBrand, 1600)
      cleanups.push(() => {
        window.clearTimeout(settleTimer)
        settleBrand()
      })
    }

    const cipherRaf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const cipherDelay = window.setTimeout(startCipher, 100)
        cleanups.push(() => window.clearTimeout(cipherDelay))
      })
    })
    cleanups.push(() => cancelAnimationFrame(cipherRaf))
  }

  setIrisOrigin(root, compact)
  const irisBoot = document.documentElement.classList.contains('nuc-iris-boot')
  if (irisBoot) {
    setVar(root, '--home-iris', '0%')
    const irisOpenTimer = window.setTimeout(
      () => {
        setVar(root, '--home-iris', '165%')
      },
      compact ? 40 : 80
    )
    cleanups.push(() => window.clearTimeout(irisOpenTimer))
  } else {
    setVar(root, '--home-iris', '165%')
  }

  const clearHeroFilters = () => {
    for (const el of [eyebrow, mark, panel]) {
      el?.style.removeProperty('filter')
    }
  }

  const timeline = createTimeline({
    defaults: { ease: 'outExpo' },
    onComplete: () => {
      finishBoot()
      heroBooted = true
      clearHeroFilters()
      settleHeroBits(
        [eyebrow, mark, brand, panel].filter((el): el is HTMLElement =>
          Boolean(el)
        )
      )
      // Headline/support/CTA settle via their own wipe onComplete - do not clear mid-mask.
      armSectionObservers()
    },
  })
  track(cleanups, timeline)

  if (!compact && rail) {
    timeline.add(
      rail,
      {
        opacity: [0, 1],
        x: [24, 0],
        filter: ['blur(10px)', 'blur(0px)'],
        duration: 900,
      },
      180
    )
  }

  if (eyebrow && !compact) {
    timeline.add(
      eyebrow,
      {
        opacity: [0, 1],
        y: [-12, 0],
        duration: 700,
      },
      40
    )
  }

  if (mark) {
    if (!compact) {
      mark.style.opacity = '0'
      timeline.add(
        mark,
        {
          opacity: [0, 1],
          scale: [0.55, 1],
          rotate: [-10, 0],
          duration: 1150,
          ease: 'outBack',
        },
        60
      )
    }
  }

  // Same path as section cards/copy: animate() + --home-wipe mask (not timeline fade).
  if (headline && !compact) {
    track(
      cleanups,
      animate(headline, {
        ...fadeWipeAnimation(1150, 240),
        onComplete: () => clearFadeWipe(headline),
      })
    )
  }

  if (support && !compact) {
    track(
      cleanups,
      animate(support, {
        ...fadeWipeAnimation(1150, 340),
        onComplete: () => clearFadeWipe(support),
      })
    )
  }

  // Wipe whole CTA row - per-button mask sliced 1px borders into ghost lines.
  if (cta && !compact) {
    track(
      cleanups,
      animate(cta, {
        ...fadeWipeAnimation(1150, 440),
        onComplete: () => clearFadeWipe(cta),
      })
    )
  }

  // Exact home hero-panel entrance (opacity + x + blur).
  if (panel && !compact) {
    timeline.add(
      panel,
      {
        opacity: [0, 1],
        x: [48, 0],
        filter: ['blur(14px)', 'blur(0px)'],
        duration: 1100,
        ease: 'outExpo',
      },
      320
    )
  }

  setVar(root, '--home-mx', '0')
  setVar(root, '--home-my', '0')
  if (!compact) {
    const current = { x: 0, y: 0 }
    let moveAnim: Revertible | undefined

    const onMove = (event: PointerEvent) => {
      const w = window.innerWidth || 1
      const h = window.innerHeight || 1
      const tx = (event.clientX / w) * 2 - 1
      const ty = (event.clientY / h) * 2 - 1
      moveAnim?.pause?.()
      moveAnim = animate(current, {
        x: tx,
        y: ty,
        duration: 900,
        ease: 'outElastic',
        onUpdate: () => {
          setVar(root, '--home-mx', current.x.toFixed(3))
          setVar(root, '--home-my', current.y.toFixed(3))
        },
      })
    }

    const onLeave = () => {
      moveAnim?.pause?.()
      moveAnim = animate(current, {
        x: 0,
        y: 0,
        duration: 1100,
        ease: 'outExpo',
        onUpdate: () => {
          setVar(root, '--home-mx', current.x.toFixed(3))
          setVar(root, '--home-my', current.y.toFixed(3))
        },
      })
    }

    root.addEventListener('pointermove', onMove)
    root.addEventListener('pointerleave', onLeave)
    cleanups.push(() => {
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', onLeave)
      moveAnim?.pause?.()
    })
  }

  const viewportShare = (entry: IntersectionObserverEntry): number => {
    const rootHeight = entry.rootBounds?.height
    if (!rootHeight) return 0
    return entry.intersectionRect.height / rootHeight
  }

  const ioThresholds = Array.from({ length: 21 }, (_, i) => i / 20)

  const isCompactViewport = () => compact

  /** Same scroll reveal contract as home `bindSection` / `revealMask`. */
  const bindSection = (
    section: HTMLElement | null,
    handlers: {
      prepare: () => void
      play: (local: Array<() => void>) => void
      settle?: () => void
    },
    options?: {
      prepareOnBind?: boolean
      skipInitialSync?: boolean
      replayOnCompact?: boolean
    }
  ) => {
    if (!section) return

    let visible = false
    let revealed = false
    let local: Array<() => void> = []

    const clearLocal = () => {
      for (const fn of local.reverse()) fn()
      local = []
    }

    const enter = () => {
      if (visible) return
      visible = true
      clearLocal()

      if (options?.skipInitialSync && !revealed) {
        revealed = true
        return
      }

      if (
        revealed &&
        isCompactViewport() &&
        options?.replayOnCompact !== true
      ) {
        handlers.settle?.()
        return
      }

      handlers.prepare()
      handlers.play(local)
      revealed = true
    }

    const leave = () => {
      if (!visible) return
      visible = false
      clearLocal()
      if (isCompactViewport() && options?.replayOnCompact !== true) {
        handlers.settle?.()
        return
      }
      handlers.prepare()
    }

    const syncShare = (share: number, intersecting: boolean) => {
      if (intersecting && share >= 0.22) enter()
      else if (share <= 0.1) leave()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          syncShare(viewportShare(entry), entry.isIntersecting)
        }
      },
      { root: scroller, threshold: ioThresholds }
    )

    if (options?.prepareOnBind === true) {
      handlers.prepare()
    }

    observer.observe(section)
    cleanups.push(() => {
      clearLocal()
      visible = false
      revealed = false
      observer.disconnect()
    })
  }

  const trackLocal = (
    local: Array<() => void>,
    item: Revertible | null | undefined
  ) => {
    if (!item) return
    local.push(() => {
      try {
        item.pause?.()
        item.cancel?.()
        item.revert?.()
      } catch {
        /* noop */
      }
    })
  }

  const settleMaskItems = (items: HTMLElement[]) => {
    for (const item of items) clearFadeWipe(item)
  }

  const revealMask = (section: HTMLElement | null, items: HTMLElement[]) => {
    if (!section || items.length === 0) return

    const prepare = () => {
      for (const item of items) prepareFadeWipe(item)
    }

    bindSection(section, {
      prepare,
      settle: () => settleMaskItems(items),
      play: (local) => {
        trackLocal(
          local,
          animate(items, {
            ...fadeWipeAnimation(1150, stagger(100)),
            onComplete: () => settleMaskItems(items),
          })
        )
      },
    })
  }

  // Hero re-entry + section reveals - after intro boot (avoids IO reflow thrash).
  let sectionObserversArmed = false
  const armSectionObservers = () => {
    if (sectionObserversArmed) return
    sectionObserversArmed = true

    const hero = q(root, '.nuc-home-hero')
    const heroBits = [eyebrow, mark, panel].filter((el): el is HTMLElement =>
      Boolean(el)
    )
    const heroWipeBits = [headline, support, cta].filter(
      (el): el is HTMLElement => Boolean(el)
    )

    bindSection(
      hero,
      {
        prepare: () => {
          if (!heroBooted) return
          for (const item of heroBits) {
            item.style.opacity = '0'
            item.style.filter = 'blur(10px)'
            item.style.removeProperty('translate')
          }
          for (const item of heroWipeBits) prepareFadeWipe(item)
        },
        settle: () => {
          settleHeroBits(heroBits)
          for (const item of heroWipeBits) clearFadeWipe(item)
        },
        play: (local) => {
          if (!heroBooted) return
          if (heroBits.length > 0) {
            trackLocal(
              local,
              animate(heroBits, {
                opacity: [0, 1],
                filter: ['blur(10px)', 'blur(0px)'],
                duration: 700,
                delay: stagger(60),
                ease: 'outExpo',
                onComplete: () => settleHeroBits(heroBits),
              })
            )
          }
          if (heroWipeBits.length > 0) {
            trackLocal(
              local,
              animate(heroWipeBits, {
                ...fadeWipeAnimation(1150, stagger(100)),
                onComplete: () => {
                  for (const item of heroWipeBits) clearFadeWipe(item)
                },
              })
            )
          }
        },
      },
      {
        prepareOnBind: false,
        skipInitialSync: true,
        replayOnCompact: false,
      }
    )

    revealMask(q(root, '.nuc-inv-why'), [
      ...qa(
        root,
        '.nuc-inv-why-head .nuc-home-eyebrow, .nuc-inv-why-head .nuc-home-title, .nuc-inv-why-head .nuc-home-support, .nuc-inv-why-cta, .nuc-inv-why-viz'
      ),
      ...qa(root, '.nuc-inv-why-card'),
    ])

    revealMask(q(root, '.nuc-inv-keep'), [
      ...qa(
        root,
        '.nuc-inv-keep-head .nuc-home-eyebrow, .nuc-inv-keep-head .nuc-home-title, .nuc-inv-keep-head .nuc-home-support, .nuc-inv-keep-cta, .nuc-inv-keep-focus, .nuc-inv-keep-rail, .nuc-inv-keep-note'
      ),
    ])

    revealMask(q(root, '.nuc-inv-plan'), [
      ...qa(
        root,
        '.nuc-inv-plan-head .nuc-home-eyebrow, .nuc-inv-plan-head .nuc-home-title, .nuc-inv-plan-head .nuc-home-support'
      ),
      ...qa(root, '.nuc-inv-plan-card'),
    ])

    // Spotlight + tabs separately (like card grids) - wiping the whole stage skewed the board.
    revealMask(q(root, '.nuc-inv-reach'), [
      ...qa(
        root,
        '.nuc-inv-reach-head .nuc-home-eyebrow, .nuc-inv-reach-head .nuc-home-title, .nuc-inv-reach-head .nuc-home-support'
      ),
      ...qa(root, '.nuc-inv-reach-spotlight'),
      ...qa(root, '.nuc-inv-reach-tab'),
    ])

    // Match home close: animate copy/cta/footer containers (not title/support alone).
    const bindAskReveal = () => {
      const ask = q(root, '#ask.nuc-home-close')
      if (!ask) return false
      const items = qa(
        ask,
        '.nuc-home-close-copy, .nuc-home-close-cta, .nuc-home-close-footer'
      )
      if (items.length === 0) return false
      revealMask(ask, items)
      return true
    }

    if (!bindAskReveal()) {
      const mo = new MutationObserver(() => {
        if (!bindAskReveal()) return
        mo.disconnect()
      })
      mo.observe(root, { childList: true, subtree: true })
      cleanups.push(() => mo.disconnect())
    }
  }

  if (compact) {
    const irisBoot =
      document.documentElement.classList.contains('nuc-iris-boot')
    const irisDone = window.setTimeout(
      () => {
        finishBoot()
        heroBooted = true
        armSectionObservers()
      },
      irisBoot ? 1150 : 0
    )
    cleanups.push(() => window.clearTimeout(irisDone))
    return () => {
      for (const fn of cleanups.reverse()) fn()
      root.classList.remove('nuc-home-ready', 'nuc-home-booting')
    }
  }

  const safety = window.setTimeout(() => {
    finishBoot()
    heroBooted = true
    clearHeroFilters()
    settleHeroBits(
      [eyebrow, mark, brand, panel].filter((el): el is HTMLElement =>
        Boolean(el)
      )
    )
    if (headline) clearFadeWipe(headline)
    if (support) clearFadeWipe(support)
    if (cta) clearFadeWipe(cta)
    armSectionObservers()
  }, 3000)
  cleanups.push(() => window.clearTimeout(safety))

  return () => {
    for (const fn of cleanups.reverse()) fn()
    root.classList.remove('nuc-home-ready', 'nuc-home-booting')
  }
}
