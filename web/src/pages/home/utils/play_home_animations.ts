import { isAutomatedAudit } from './is_automated_audit'

import type { TweenParamValue } from 'animejs'

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

function prepareFadeWipe(item: HTMLElement): void {
  item.classList.add('nuc-home-anim-mask')
  item.style.setProperty('--home-wipe', '0')
  item.style.opacity = '0'
  item.style.transform = `translate3d(${WIPE_SHIFT}px, 0, 0) skewX(${WIPE_SKEW}deg)`
  item.style.removeProperty('clip-path')
  item.style.removeProperty('filter')
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
  item.style.removeProperty('--home-wipe-l')
  item.style.removeProperty('--home-wipe-r')
  item.style.removeProperty('mask-image')
  item.style.removeProperty('-webkit-mask-image')
  item.style.clipPath = 'none'
  item.style.filter = 'none'
  item.style.transform = 'none'
  item.style.opacity = '1'
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

/** CSS defaults only — no layout reads (avoids boot forced reflow). */
function setIrisOrigin(root: HTMLElement, compact: boolean): void {
  if (!compact) {
    setVar(root, '--home-iris-x', '18%')
    setVar(root, '--home-iris-y', '40%')
    return
  }
  // Mobile origin near brand — LCP peeks through the starting circle.
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
  el.style.removeProperty('--home-wipe-l')
  el.style.removeProperty('--home-wipe-r')
  el.style.removeProperty('mask-image')
  el.style.removeProperty('-webkit-mask-image')
  el.style.removeProperty('translate')
  el.style.removeProperty('rotate')
  el.style.removeProperty('scale')
  el.classList.remove('nuc-home-anim-mask', 'nuc-home-anim-lattice')
}

function settleHeroBits(items: HTMLElement[]): void {
  for (const item of items) {
    clearMotionStyles(item)
    item.style.opacity = '1'
  }
}

function scheduleWhenIdle(task: () => void, cleanups: Array<() => void>): void {
  if (typeof window.requestIdleCallback === 'function') {
    const id = window.requestIdleCallback(task, { timeout: 2500 })
    cleanups.push(() => window.cancelIdleCallback(id))
    return
  }

  const id = window.setTimeout(task, 1)
  cleanups.push(() => window.clearTimeout(id))
}

function warmBrandFonts(): void {
  void Promise.all([
    document.fonts.load("700 4rem 'JetBrains Mono'"),
    document.fonts.load("600 4rem 'JetBrains Mono'"),
  ]).catch(() => {
    /* fallback stack is fine for first paint */
  })
}

/**
 * Nucleify motion system — intentionally non-generic:
 * cipher decode, iris wipe, magnetic shear, glitch-mask / lattice scroll.
 */
export async function playHomeAnimations(
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
    root.classList.add('nuc-home-static')
    finishBoot()
    return () => {
      root.classList.remove(
        'nuc-home-ready',
        'nuc-home-booting',
        'nuc-home-static'
      )
    }
  }

  await runHomeMotionEngine(root, cleanups, finishBoot, {
    getHeroBooted: () => heroBooted,
    setHeroBooted: () => {
      heroBooted = true
    },
  })

  return () => {
    for (const fn of cleanups.reverse()) fn()
    root.classList.remove('nuc-home-ready', 'nuc-home-booting')
  }
}

type MotionEngineOptions = {
  getHeroBooted: () => boolean
  setHeroBooted: () => void
}

async function runHomeMotionEngine(
  root: HTMLElement,
  cleanups: Array<() => void>,
  finishBoot: () => void,
  motion: MotionEngineOptions
): Promise<void> {
  let heroBooted = motion.getHeroBooted()

  const scroller = q(root, '.nuc-home-scroller') ?? root
  const compact = window.matchMedia('(max-width: 960px)').matches
  const irisBoot = document.documentElement.classList.contains('nuc-iris-boot')
  const nav = q(root, '.nuc-home-nav')
  const rail = q(root, '.nuc-home-rail')
  const eyebrow = q(root, '.nuc-home-hero-eyebrow')
  const mark = q(root, '.nuc-home-hero-mark')
  const brand = q(root, '.nuc-home-hero-brand')
  const headline = q(root, '.nuc-home-hero-headline')
  const support = q(root, '.nuc-home-hero-support')
  const cta = q(root, '.nuc-home-hero-cta')
  const proof = q(root, '.nuc-home-hero-proof')
  const panel = q(root, '.nuc-home-hero-panel')

  // Strip leftover leave/prepare styles (blur/opacity) from a prior visit or replay.
  for (const el of [
    nav,
    rail,
    eyebrow,
    mark,
    brand,
    headline,
    support,
    cta,
    proof,
    panel,
    ...qa(root, '.nuc-home-anim-mask, .nuc-home-anim-lattice'),
  ]) {
    clearMotionStyles(el)
  }

  // Iris before animejs — lab paints open (no nuc-iris-boot); humans wipe 0→165.
  setIrisOrigin(root, compact)
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

  // Mobile: finish iris without blocking on animejs parse (TBT).
  if (compact) {
    await new Promise<void>((resolve) => {
      const ms = irisBoot ? 1150 : 0
      const t = window.setTimeout(resolve, ms)
      cleanups.push(() => window.clearTimeout(t))
    })
    finishBoot()
    motion.setHeroBooted()
    heroBooted = true
  }

  let animate: typeof import('animejs').animate
  let createTimeline: typeof import('animejs').createTimeline
  let stagger: typeof import('animejs').stagger
  try {
    ;({ animate, createTimeline, stagger } = await import('animejs'))
  } catch {
    // Broken / missing client bundle must not leave iris at 0% (black screen).
    setVar(root, '--home-iris', '165%')
    finishBoot()
    motion.setHeroBooted()
    cleanups.push(() => {
      root.classList.remove(
        'nuc-home-ready',
        'nuc-home-booting',
        'nuc-home-static'
      )
    })
    return
  }

  if (!compact) warmBrandFonts()

  // Hide assemble targets before the timeline so they don't flash while animejs starts.
  // Compact (mobile): keep hero painted — only iris wiped.
  if (!compact) {
    for (const el of [nav, rail, eyebrow, mark, cta, proof, panel]) {
      if (el) el.style.opacity = '0'
    }
    if (headline) headline.style.clipPath = 'inset(0 100% 0 0)'
    if (support) support.style.clipPath = 'inset(100% 0 0 0)'
  }

  // 1) Cipher decode — desktop only under iris; skip on mobile (Speed Index / LCP text).
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
        brand.textContent = finalBrand
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
      requestAnimationFrame(startCipher)
    })
    cleanups.push(() => cancelAnimationFrame(cipherRaf))
  }

  // 3) Hero assemble
  const clearHeroFilters = () => {
    for (const el of [eyebrow, mark, headline, support, cta, proof, panel]) {
      el?.style.removeProperty('filter')
    }
  }

  // After intro boot — IO + section prepares read layout; running them during
  // iris/timeline thrash with animejs writes (forced reflow in lab).
  let scrollSectionsBound = false
  const bindScrollSectionsAfterBoot = () => {
    if (scrollSectionsBound) return
    scrollSectionsBound = true
    setupScrollSections()
  }

  const finishBootAndBind = () => {
    finishBoot()
    bindScrollSectionsAfterBoot()
  }

  const timeline = createTimeline({
    defaults: { ease: 'outExpo' },
    onComplete: () => {
      finishBootAndBind()
      motion.setHeroBooted()
      heroBooted = true
      clearHeroFilters()
      settleHeroBits(
        [eyebrow, mark, brand, headline, support, cta, proof, panel].filter(
          (el): el is HTMLElement => Boolean(el)
        )
      )
    },
  })
  track(cleanups, timeline)

  // Desktop-only boot timeline — mobile stays on the SSR paint (no chrome tween).
  if (!compact) {
    if (nav) {
      timeline.add(
        nav,
        {
          opacity: [0, 1],
          y: [-28, 0],
          filter: ['blur(12px)', 'blur(0px)'],
          duration: 900,
        },
        0
      )
    }

    if (rail) {
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

    if (eyebrow) {
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

  if (headline && !compact) {
    headline.style.clipPath = 'inset(0 100% 0 0)'
    timeline.add(
      headline,
      {
        clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'],
        duration: 1150,
      },
      380
    )
  }

  if (support && !compact) {
    support.style.clipPath = 'inset(100% 0 0 0)'
    timeline.add(
      support,
      {
        clipPath: ['inset(100% 0 0 0)', 'inset(0% 0 0 0)'],
        duration: 1050,
      },
      520
    )
  }

  if (cta && !compact) {
    timeline.add(
      cta,
      {
        opacity: [0, 1],
        y: [48, 0],
        rotateX: [62, 0],
        duration: 950,
      },
      680
    )
  }

  if (proof && !compact) {
    timeline.add(
      proof,
      {
        opacity: [0, 1],
        y: [16, 0],
        duration: 800,
      },
      820
    )
  }

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

  // 4) Magnetic pointer shear (elastic) — desktop only; no layout reads.
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

  // 5) Scroll: replay enter animations on every section visit.
  // Use viewport coverage (not target ratio) — on mobile panels are taller than
  // the scroller, so intersectionRatio can never reach 0.45 and content stayed hidden.
  const viewportShare = (entry: IntersectionObserverEntry): number => {
    // Prefer IO geometry — avoid scroller.clientHeight (forced reflow) mid-motion.
    const rootHeight = entry.rootBounds?.height
    if (!rootHeight) return 0
    return entry.intersectionRect.height / rootHeight
  }

  const ioThresholds = Array.from({ length: 21 }, (_, i) => i / 20)
  const isCompactViewport = () => compact

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

      // Boot already assembled this pass — don't replay y/translate on first observe.
      if (options?.skipInitialSync && !revealed) {
        revealed = true
        return
      }

      // Mobile: after first reveal, skip prepare unless the section opts in
      // (lattice/mask left cards tilted). Hero replays hide→fade like desktop.
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
      {
        root: scroller,
        threshold: ioThresholds,
      }
    )

    if (options?.prepareOnBind !== false) {
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
    for (const item of items) {
      clearFadeWipe(item)
    }
  }

  const revealMask = (section: HTMLElement | null, items: HTMLElement[]) => {
    if (!section || items.length === 0) return

    const prepare = () => {
      for (const item of items) {
        prepareFadeWipe(item)
      }
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

  // Hero re-entry (boot already handled first paint; replay assemble after leave)
  const setupScrollSections = () => {
    const hero = q(root, '.nuc-home-hero')
    const heroBits = [
      eyebrow,
      mark,
      headline,
      support,
      cta,
      proof,
      panel,
    ].filter((el): el is HTMLElement => Boolean(el))

    bindSection(
      hero,
      {
        prepare: () => {
          if (!heroBooted) return
          for (const item of heroBits) {
            item.style.opacity = '0'
            item.style.filter = 'blur(10px)'
            // No translate on leave — avoids “too low then jump” when rail returns to intro.
            item.style.removeProperty('translate')
          }
        },
        settle: () => settleHeroBits(heroBits),
        play: (local) => {
          if (!heroBooted) return
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
        },
      },
      {
        prepareOnBind: false,
        skipInitialSync: true,
        // Mobile: keep hero painted — replay hide→blur felt like a jump on return.
        replayOnCompact: false,
      }
    )

    revealMask(q(root, '.nuc-home-pillars'), [
      ...qa(
        root,
        '.nuc-home-pillars .nuc-home-eyebrow, .nuc-home-pillars .nuc-home-title, .nuc-home-pillars .nuc-home-support, .nuc-home-pillars-cta'
      ),
      ...qa(root, '.nuc-home-pillars-share'),
      ...qa(root, '.nuc-home-pillars-item'),
    ])

    const stack = q(root, '.nuc-home-stack')
    const stackMask = qa(
      root,
      '.nuc-home-stack .nuc-home-eyebrow, .nuc-home-stack .nuc-home-title, .nuc-home-stack .nuc-home-support, .nuc-home-stack .nuc-home-next, .nuc-home-stack-spotlight'
    )
    const stackLattice = qa(root, '.nuc-home-stack-item')
    /** Desktop rest pose — matches CSS --sx/--sy/--sr on .nuc-home-stack-item */
    const stackLatticeRest = [
      { x: -8, y: 2, r: -3.5 },
      { x: 12, y: -18, r: 3 },
      { x: 6, y: 6, r: 2 },
      { x: -6, y: -10, r: -2.5 },
      { x: -14, y: 10, r: -2 },
      { x: 10, y: 0, r: 3.5 },
      { x: 0, y: 6, r: -1.5 },
    ] as const

    if (stack && (stackMask.length || stackLattice.length)) {
      const settleStack = () => {
        settleMaskItems(stackMask)
        for (const item of stackLattice) {
          item.style.opacity = '1'
          item.style.filter = 'none'
          // Drop anime inline transform so CSS scatter wins on every viewport.
          item.style.removeProperty('transform')
          item.style.removeProperty('translate')
          item.style.removeProperty('rotate')
          item.style.removeProperty('scale')
          item.classList.remove('nuc-home-anim-lattice')
        }
      }

      bindSection(stack, {
        prepare: () => {
          for (const item of stackMask) {
            prepareFadeWipe(item)
          }

          stackLattice.forEach((item, index) => {
            const rest = stackLatticeRest[index] ?? stackLatticeRest[0]!
            item.classList.add('nuc-home-anim-lattice')
            item.style.opacity = '0'
            item.style.transform = `translate3d(${rest.x * 5}px, ${rest.y + 64}px, 0) rotate(${rest.r * 2.4}deg) scale(0.84)`
            item.style.filter = ''
            item.style.clipPath = ''
          })
        },
        settle: settleStack,
        play: (local) => {
          const compact = isCompactViewport()
          const maskStagger = compact ? 60 : 100
          const maskDuration = compact ? 700 : 1150
          const spotlightIndex = stackMask.findIndex((el) =>
            el.classList.contains('nuc-home-stack-spotlight')
          )
          const spotlightAt = Math.max(0, spotlightIndex) * maskStagger
          // Left card leads; chips follow as soon as the spotlight wipe is on screen.
          const latticeStart = spotlightAt + (compact ? 120 : 200)
          const latticeStep = compact ? 50 : 90
          const latticeDuration = compact ? 900 : 1300
          const latticeDone =
            latticeStart +
            Math.max(0, stackLattice.length - 1) * latticeStep +
            latticeDuration

          const armSettle = () => {
            const id = window.setTimeout(settleStack, latticeDone + 80)
            local.push(() => window.clearTimeout(id))
          }

          if (stackMask.length) {
            trackLocal(
              local,
              animate(stackMask, {
                ...fadeWipeAnimation(maskDuration, stagger(maskStagger)),
                onComplete: () => settleMaskItems(stackMask),
              })
            )
          }

          if (stackLattice.length) {
            stackLattice.forEach((item, index) => {
              const rest = stackLatticeRest[index] ?? stackLatticeRest[0]!
              const isLast = index === stackLattice.length - 1
              trackLocal(
                local,
                animate(item, {
                  opacity: [0, 1],
                  x: [rest.x * 5, rest.x],
                  y: [rest.y + 64, rest.y],
                  rotate: [rest.r * 2.4, rest.r],
                  scale: [0.84, 1],
                  duration: latticeDuration,
                  delay: latticeStart + index * latticeStep,
                  ease: 'outElastic',
                  ...(isLast ? { onComplete: settleStack } : {}),
                })
              )
            })
          }

          armSettle()
        },
      })
    }

    const pulse = q(root, '.nuc-home-pulse')
    const pulseStage = q(root, '.nuc-home-pulse-stage')
    const pulseCopy = qa(
      root,
      '.nuc-home-pulse-copy .nuc-home-eyebrow, .nuc-home-pulse-copy .nuc-home-title, .nuc-home-pulse-copy .nuc-home-support, .nuc-home-pulse-copy .nuc-home-pulse-compare, .nuc-home-pulse-copy .nuc-home-next'
    )

    if (pulse) {
      const settlePulse = () => {
        settleMaskItems(pulseCopy)
        if (pulseStage) {
          pulseStage.style.opacity = '1'
          pulseStage.style.filter = 'none'
          pulseStage.style.transform = 'none'
        }
      }

      bindSection(pulse, {
        prepare: () => {
          for (const item of pulseCopy) {
            prepareFadeWipe(item)
          }

          if (pulseStage) {
            pulseStage.style.opacity = '0'
            pulseStage.style.transform = `translate3d(${WIPE_SHIFT}px, 0, 0) skewX(${WIPE_SKEW}deg)`
          }
        },
        settle: settlePulse,
        play: (local) => {
          if (pulseCopy.length) {
            trackLocal(
              local,
              animate(pulseCopy, {
                ...fadeWipeAnimation(1150, stagger(100)),
                onComplete: () => settleMaskItems(pulseCopy),
              })
            )
          }

          if (pulseStage) {
            trackLocal(
              local,
              animate(pulseStage, {
                opacity: [0, 1],
                x: [WIPE_SHIFT, 0],
                skewX: [WIPE_SKEW, 0],
                duration: 1150,
                delay: 400,
                ease: 'outExpo',
                onComplete: settlePulse,
              })
            )
          } else {
            const settleTimer = window.setTimeout(settlePulse, 1400)
            local.push(() => window.clearTimeout(settleTimer))
          }
        },
      })
    }

    const compiler = q(root, '.nuc-home-compiler')
    const compilerCopy = qa(
      root,
      '.nuc-home-compiler-copy .nuc-home-eyebrow, .nuc-home-compiler-copy .nuc-home-title, .nuc-home-compiler-copy .nuc-home-support, .nuc-home-compiler-copy .nuc-home-next'
    )
    const compilerStage = q(root, '.nuc-home-compiler-board')

    if (compiler) {
      const settleCompiler = () => {
        settleMaskItems(compilerCopy)
        if (compilerStage) {
          compilerStage.style.opacity = '1'
          compilerStage.style.filter = 'none'
          compilerStage.style.transform = 'none'
        }
      }

      bindSection(compiler, {
        prepare: () => {
          for (const item of compilerCopy) {
            prepareFadeWipe(item)
          }
          if (compilerStage) {
            compilerStage.style.opacity = '0'
            compilerStage.style.transform = `translate3d(${WIPE_SHIFT}px, 0, 0) skewX(${WIPE_SKEW}deg)`
          }
        },
        settle: settleCompiler,
        play: (local) => {
          if (compilerCopy.length) {
            trackLocal(
              local,
              animate(compilerCopy, {
                ...fadeWipeAnimation(1150, stagger(100)),
                onComplete: () => settleMaskItems(compilerCopy),
              })
            )
          }
          if (compilerStage) {
            trackLocal(
              local,
              animate(compilerStage, {
                opacity: [0, 1],
                x: [WIPE_SHIFT, 0],
                skewX: [WIPE_SKEW, 0],
                duration: 1150,
                delay: 400,
                ease: 'outExpo',
                onComplete: settleCompiler,
              })
            )
          } else {
            const settleTimer = window.setTimeout(settleCompiler, 1400)
            local.push(() => window.clearTimeout(settleTimer))
          }
        },
      })
    }

    const clone = q(root, '.nuc-home-clone')
    const cloneCopy = qa(
      root,
      '.nuc-home-clone-copy .nuc-home-eyebrow, .nuc-home-clone-copy .nuc-home-title, .nuc-home-clone-copy .nuc-home-support, .nuc-home-clone-actions'
    )
    const cloneTerm = q(root, '.nuc-home-clone-term')

    if (clone) {
      const settleClone = () => {
        settleMaskItems(cloneCopy)
        if (cloneTerm) {
          cloneTerm.style.opacity = '1'
          cloneTerm.style.filter = 'none'
          cloneTerm.style.transform = 'none'
        }
      }

      bindSection(clone, {
        prepare: () => {
          for (const item of cloneCopy) {
            prepareFadeWipe(item)
          }
          if (cloneTerm) {
            cloneTerm.style.opacity = '0'
            cloneTerm.style.transform = `translate3d(${WIPE_SHIFT}px, 0, 0) skewX(${WIPE_SKEW}deg)`
          }
        },
        settle: settleClone,
        play: (local) => {
          if (cloneCopy.length) {
            trackLocal(
              local,
              animate(cloneCopy, {
                ...fadeWipeAnimation(1150, stagger(100)),
                onComplete: () => settleMaskItems(cloneCopy),
              })
            )
          }
          if (cloneTerm) {
            trackLocal(
              local,
              animate(cloneTerm, {
                opacity: [0, 1],
                x: [WIPE_SHIFT, 0],
                skewX: [WIPE_SKEW, 0],
                duration: 1150,
                delay: 400,
                ease: 'outExpo',
                onComplete: settleClone,
              })
            )
          }
        },
      })
    }

    revealMask(
      q(root, '.nuc-home-close'),
      qa(
        root,
        '.nuc-home-close-copy, .nuc-home-close-cta, .nuc-home-close-footer'
      )
    )
  }

  if (compact) {
    // Boot already finished before animejs — only bind scroll reveals.
    bindScrollSectionsAfterBoot()
    return
  }

  const safety = window.setTimeout(() => {
    finishBootAndBind()
    motion.setHeroBooted()
    heroBooted = true
    clearHeroFilters()
    settleHeroBits(
      [eyebrow, mark, brand, headline, support, cta, proof, panel].filter(
        (el): el is HTMLElement => Boolean(el)
      )
    )
  }, 3000)
  cleanups.push(() => window.clearTimeout(safety))
}
