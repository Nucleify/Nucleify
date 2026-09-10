import { isAutomatedAudit } from './is_automated_audit'

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

function offsetFromAncestor(
  el: HTMLElement,
  ancestor: HTMLElement
): { x: number; y: number } {
  let x = 0
  let y = 0
  let node: HTMLElement | null = el
  while (node && node !== ancestor) {
    x += node.offsetLeft
    y += node.offsetTop
    const parent: Element | null = node.offsetParent
    if (!(parent instanceof HTMLElement) || parent === node) break
    if (parent !== ancestor && !ancestor.contains(parent)) {
      node = node.parentElement
      continue
    }
    node = parent
  }
  return { x, y }
}

function clampPercent(value: number, min: number, max: number): string {
  return `${Math.min(max, Math.max(min, value)).toFixed(2)}%`
}

function setIrisOrigin(
  root: HTMLElement,
  mark: HTMLElement | null,
  compact: boolean
): void {
  if (!compact) {
    setVar(root, '--home-iris-x', '18%')
    setVar(root, '--home-iris-y', '40%')
    return
  }

  if (!mark) {
    setVar(root, '--home-iris-x', '12%')
    setVar(root, '--home-iris-y', '16%')
    return
  }

  const { x, y } = offsetFromAncestor(mark, root)
  const w = root.offsetWidth || 1
  const h = root.offsetHeight || 1
  setVar(
    root,
    '--home-iris-x',
    clampPercent(((x + mark.offsetWidth * 0.08) / w) * 100, 6, 72)
  )
  setVar(
    root,
    '--home-iris-y',
    clampPercent(((y + mark.offsetHeight * 0.4) / h) * 100, 8, 42)
  )
}

function clearMotionStyles(el: HTMLElement | null | undefined): void {
  if (!el) return
  el.style.removeProperty('opacity')
  el.style.removeProperty('filter')
  el.style.removeProperty('transform')
  el.style.removeProperty('clip-path')
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
    document.fonts.load("650 4rem 'JetBrains Mono'"),
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
    finishBoot()
    return () => {
      root.classList.remove('nuc-home-ready', 'nuc-home-booting')
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

  const { animate, createTimeline, stagger } = await import('animejs')

  warmBrandFonts()

  const scroller = q(root, '.nuc-home-scroller') ?? root
  const compact = window.matchMedia('(max-width: 960px)').matches
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

  // Hide assemble targets before the timeline so they don't flash while animejs starts.
  for (const el of [nav, rail, eyebrow, mark, cta, proof, panel]) {
    if (el) el.style.opacity = '0'
  }
  if (headline) headline.style.clipPath = 'inset(0 100% 0 0)'
  if (support) support.style.clipPath = 'inset(100% 0 0 0)'

  // 1) Cipher decode — runs under the iris/fade so glyphs never flash at full opacity.

  const finalBrand = brand?.textContent?.trim() || 'Nucleify'
  const glyphs = '01<>{}[]/\\|#$%#_entropynucleus'
  if (brand) {
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

  // 2) Iris wipe — on mobile from the title line, not viewport center.
  setVar(root, '--home-iris', '0%')
  setIrisOrigin(root, mark, compact)
  if (compact && mark) {
    mark.style.transformOrigin = 'left 0.55em'
  }

  const iris = { r: 0 }
  track(
    cleanups,
    animate(iris, {
      r: 165,
      duration: 1700,
      delay: 80,
      ease: 'inOutCubic',
      onUpdate: () => setVar(root, '--home-iris', `${iris.r}%`),
    })
  )

  // 3) Hero assemble
  const clearHeroFilters = () => {
    for (const el of [eyebrow, mark, headline, support, cta, proof, panel]) {
      el?.style.removeProperty('filter')
    }
  }

  const timeline = createTimeline({
    defaults: { ease: 'outExpo' },
    onComplete: () => {
      finishBoot()
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

  if (headline) {
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

  if (support) {
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

  if (cta) {
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

  if (proof) {
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

  if (panel) {
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
    const rootHeight = entry.rootBounds?.height ?? scroller.clientHeight
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
      item.style.clipPath = 'none'
      item.style.filter = 'none'
      item.style.transform = 'none'
      item.style.opacity = '1'
    }
  }

  const revealMask = (section: HTMLElement | null, items: HTMLElement[]) => {
    if (!section || items.length === 0) return

    const prepare = () => {
      for (const item of items) {
        item.classList.add('nuc-home-anim-mask')
        item.style.clipPath = 'inset(0 100% 0 -8%)'
        item.style.filter = 'blur(10px)'
        item.style.transform = 'translate3d(-28px, 0, 0) skewX(-10deg)'
        item.style.opacity = '1'
      }
    }

    bindSection(section, {
      prepare,
      settle: () => settleMaskItems(items),
      play: (local) => {
        trackLocal(
          local,
          animate(items, {
            clipPath: ['inset(0 100% 0 -8%)', 'inset(0 0% 0 0%)'],
            filter: ['blur(10px)', 'blur(0px)'],
            x: [-28, 0],
            skewX: [-10, 0],
            duration: 1150,
            delay: stagger(100),
            ease: 'outExpo',
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
            item.style.translate = '0 24px'
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
              y: [24, 0],
              duration: 900,
              delay: stagger(70),
              ease: 'outExpo',
              onComplete: () => settleHeroBits(heroBits),
            })
          )
        },
      },
      {
        prepareOnBind: false,
        skipInitialSync: true,
        replayOnCompact: true,
      }
    )

    revealMask(q(root, '.nuc-home-pillars'), [
      ...qa(
        root,
        '.nuc-home-pillars .nuc-home-eyebrow, .nuc-home-pillars .nuc-home-title, .nuc-home-pillars .nuc-home-support, .nuc-home-pillars-cta'
      ),
      ...qa(root, '.nuc-home-pillars-flow-item'),
      ...qa(root, '.nuc-home-pillars-item'),
    ])

    const stack = q(root, '.nuc-home-stack')
    const stackMask = qa(
      root,
      '.nuc-home-stack .nuc-home-eyebrow, .nuc-home-stack .nuc-home-title, .nuc-home-stack .nuc-home-support, .nuc-home-stack-spotlight'
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
          // Drop anime inline transform so CSS scatter (desktop) or grid (mobile) wins.
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
            item.classList.add('nuc-home-anim-mask')
            item.style.clipPath = 'inset(0 100% 0 -8%)'
            item.style.filter = 'blur(10px)'
            item.style.transform = 'translate3d(-28px, 0, 0) skewX(-10deg)'
            item.style.opacity = '1'
          }

          // Mobile: no lattice fly-in (rotate/translate left cards stuck mid-air).
          if (isCompactViewport()) {
            for (const item of stackLattice) {
              item.style.opacity = '0'
              item.style.transform = 'none'
              item.style.filter = 'none'
              item.style.clipPath = ''
            }
            return
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
          const armSettle = () => {
            const id = window.setTimeout(settleStack, 1400)
            local.push(() => window.clearTimeout(id))
          }

          if (stackMask.length) {
            trackLocal(
              local,
              animate(stackMask, {
                clipPath: ['inset(0 100% 0 -8%)', 'inset(0 0% 0 0%)'],
                filter: ['blur(10px)', 'blur(0px)'],
                x: [-28, 0],
                skewX: [-10, 0],
                duration: isCompactViewport() ? 700 : 1150,
                delay: stagger(isCompactViewport() ? 60 : 100),
                ease: 'outExpo',
                onComplete: () => settleMaskItems(stackMask),
              })
            )
          }

          if (stackLattice.length) {
            if (isCompactViewport()) {
              trackLocal(
                local,
                animate(stackLattice, {
                  opacity: [0, 1],
                  duration: 500,
                  delay: stagger(40),
                  ease: 'outExpo',
                  onComplete: settleStack,
                })
              )
            } else {
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
                    duration: 1300,
                    delay: index * 90,
                    ease: 'outElastic',
                    ...(isLast ? { onComplete: settleStack } : {}),
                  })
                )
              })
            }
          }

          armSettle()
        },
      })
    }

    const pulse = q(root, '.nuc-home-pulse')
    const pulseStage = q(root, '.nuc-home-pulse-stage')
    const pulseCopy = qa(
      root,
      '.nuc-home-pulse-copy .nuc-home-eyebrow, .nuc-home-pulse-copy .nuc-home-title, .nuc-home-pulse-copy .nuc-home-support'
    )

    const craft = q(root, '.nuc-home-core')
    const craftMask = qa(
      root,
      '.nuc-home-core .nuc-home-eyebrow, .nuc-home-core .nuc-home-title, .nuc-home-core .nuc-home-support'
    )
    const craftBoard = q(root, '.nuc-home-core-board')
    const craftTrees = qa(root, '.nuc-home-core-tree')
    const craftSurface = q(root, '.nuc-home-core-surface')
    const craftPicks = qa(root, '.nuc-home-core-pick')

    if (craft && (craftMask.length || craftBoard)) {
      const settleCraft = () => {
        settleMaskItems(craftMask)
        if (craftBoard) {
          craftBoard.style.opacity = '1'
          craftBoard.style.filter = 'none'
          craftBoard.style.transform = 'none'
        }
        if (craftSurface) {
          craftSurface.style.opacity = '1'
          craftSurface.style.transform = 'none'
        }
        for (const item of craftTrees) {
          item.style.opacity = '1'
          item.style.transform = 'none'
        }
        for (const item of craftPicks) {
          item.style.opacity = '1'
          item.style.transform = 'none'
        }
      }

      bindSection(craft, {
        prepare: () => {
          for (const item of craftMask) {
            item.classList.add('nuc-home-anim-mask')
            item.style.clipPath = 'inset(0 100% 0 -8%)'
            item.style.filter = 'blur(10px)'
            item.style.transform = 'translate3d(-28px, 0, 0) skewX(-10deg)'
            item.style.opacity = '1'
          }

          if (craftBoard) {
            craftBoard.style.opacity = '0'
            craftBoard.style.filter = 'blur(12px)'
            craftBoard.style.transform = 'translate3d(0, 32px, 0) scale(0.97)'
          }

          if (craftSurface) {
            craftSurface.style.opacity = '0'
            craftSurface.style.transform = 'translate3d(0, 18px, 0) scale(0.96)'
          }

          craftTrees.forEach((item, index) => {
            item.style.opacity = '0'
            item.style.transform = `translate3d(${index === 0 ? -24 : 24}px, 0, 0)`
          })

          craftPicks.forEach((item, index) => {
            item.classList.add('nuc-home-anim-lattice')
            item.style.opacity = '0'
            item.style.transform = `translate3d(0, 22px, 0) scale(0.9) rotate(${index % 2 === 0 ? -5 : 5}deg)`
          })
        },
        settle: settleCraft,
        play: (local) => {
          if (craftMask.length) {
            trackLocal(
              local,
              animate(craftMask, {
                clipPath: ['inset(0 100% 0 -8%)', 'inset(0 0% 0 0%)'],
                filter: ['blur(10px)', 'blur(0px)'],
                x: [-28, 0],
                skewX: [-10, 0],
                duration: 1150,
                delay: stagger(100),
                ease: 'outExpo',
                onComplete: () => settleMaskItems(craftMask),
              })
            )
          }

          if (craftBoard) {
            trackLocal(
              local,
              animate(craftBoard, {
                opacity: [0, 1],
                filter: ['blur(12px)', 'blur(0px)'],
                y: [32, 0],
                scale: [0.97, 1],
                duration: 1100,
                delay: 160,
                ease: 'outExpo',
              })
            )
          }

          if (craftTrees.length) {
            craftTrees.forEach((item) => {
              const fromX = item.classList.contains('nuc-home-core-tree-module')
                ? -24
                : 24
              trackLocal(
                local,
                animate(item, {
                  opacity: [0, 1],
                  x: [fromX, 0],
                  duration: 1000,
                  delay: 280,
                  ease: 'outExpo',
                })
              )
            })
          }

          if (craftSurface) {
            trackLocal(
              local,
              animate(craftSurface, {
                opacity: [0, 1],
                y: [18, 0],
                scale: [0.96, 1],
                duration: 1050,
                delay: 320,
                ease: 'outExpo',
              })
            )
          }

          if (craftPicks.length) {
            trackLocal(
              local,
              animate(craftPicks, {
                opacity: [0, 1],
                y: [22, 0],
                scale: [0.9, 1],
                rotate: stagger([-5, 5]),
                duration: 1000,
                delay: stagger(70),
                ease: 'outElastic',
                onComplete: settleCraft,
              })
            )
          } else {
            const settleTimer = window.setTimeout(settleCraft, 1400)
            local.push(() => window.clearTimeout(settleTimer))
          }
        },
      })
    }

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
            item.classList.add('nuc-home-anim-mask')
            item.style.clipPath = 'inset(0 100% 0 -8%)'
            item.style.filter = 'blur(10px)'
            item.style.transform = 'translate3d(-28px, 0, 0) skewX(-10deg)'
            item.style.opacity = '1'
          }

          if (pulseStage) {
            pulseStage.style.opacity = '0'
            pulseStage.style.filter = 'blur(10px)'
            pulseStage.style.transform = 'translate3d(0, 24px, 0)'
          }
        },
        settle: settlePulse,
        play: (local) => {
          if (pulseCopy.length) {
            trackLocal(
              local,
              animate(pulseCopy, {
                clipPath: ['inset(0 100% 0 -8%)', 'inset(0 0% 0 0%)'],
                filter: ['blur(10px)', 'blur(0px)'],
                x: [-28, 0],
                skewX: [-10, 0],
                duration: 1150,
                delay: stagger(100),
                ease: 'outExpo',
                onComplete: () => settleMaskItems(pulseCopy),
              })
            )
          }

          if (pulseStage) {
            trackLocal(
              local,
              animate(pulseStage, {
                opacity: [0, 1],
                filter: ['blur(10px)', 'blur(0px)'],
                y: [24, 0],
                duration: 1050,
                delay: 180,
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
    if (compiler) {
      const compilerCopy = qa(
        root,
        '.nuc-home-compiler-copy .nuc-home-eyebrow, .nuc-home-compiler-copy .nuc-home-title, .nuc-home-compiler-copy .nuc-home-support'
      )
      const compilerStage = q(root, '.nuc-home-compiler-stage')

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
            item.style.opacity = '0'
            item.style.filter = 'blur(8px)'
            item.style.transform = 'translate3d(0, 18px, 0)'
          }
          if (compilerStage) {
            compilerStage.style.opacity = '0'
            compilerStage.style.filter = 'blur(10px)'
            compilerStage.style.transform = 'translate3d(0, 22px, 0)'
          }
        },
        settle: settleCompiler,
        play: (local) => {
          if (compilerCopy.length) {
            trackLocal(
              local,
              animate(compilerCopy, {
                opacity: [0, 1],
                filter: ['blur(8px)', 'blur(0px)'],
                y: [18, 0],
                duration: 900,
                delay: stagger(70),
                ease: 'outExpo',
                onComplete: () => settleMaskItems(compilerCopy),
              })
            )
          }
          if (compilerStage) {
            trackLocal(
              local,
              animate(compilerStage, {
                opacity: [0, 1],
                filter: ['blur(10px)', 'blur(0px)'],
                y: [22, 0],
                duration: 1050,
                delay: 140,
                ease: 'outExpo',
                onComplete: settleCompiler,
              })
            )
          } else {
            const settleTimer = window.setTimeout(settleCompiler, 1200)
            local.push(() => window.clearTimeout(settleTimer))
          }
        },
      })
    }

    revealMask(
      q(root, '.nuc-home-close'),
      qa(
        root,
        '.nuc-home-close-copy, .nuc-home-close-panel nui-button, .nuc-home-close-footer'
      )
    )
  }

  scheduleWhenIdle(setupScrollSections, cleanups)

  const safety = window.setTimeout(() => {
    finishBoot()
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
