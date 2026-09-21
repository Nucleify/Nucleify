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

function prepareFadeWipe(item: HTMLElement): void {
  item.classList.add('nuc-home-anim-mask')
  item.style.setProperty('--home-wipe', '0')
  item.style.transform = `translate3d(${WIPE_SHIFT}px, 0, 0) skewX(${WIPE_SKEW}deg)`
  item.style.removeProperty('clip-path')
  item.style.removeProperty('filter')
}

function fadeWipeAnimation(duration: number, delay: TweenParamValue) {
  return {
    '--home-wipe': [0, 1],
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
    document.fonts.load("650 4rem 'JetBrains Mono'"),
    document.fonts.load("600 4rem 'JetBrains Mono'"),
  ]).catch(() => {
    /* fallback stack is fine */
  })
}

/**
 * Investor motion — iris boot, cipher brand, shear, wipe reveals.
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

  const { animate, createTimeline, stagger } = await import('animejs')

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
  const proof = q(root, '.nuc-home-hero-proof')
  const panel = q(root, '.nuc-home-hero-panel')

  for (const el of [
    rail,
    eyebrow,
    mark,
    brand,
    headline,
    support,
    cta,
    proof,
    panel,
    ...qa(root, '.nuc-home-anim-mask'),
  ]) {
    clearMotionStyles(el)
  }

  for (const el of [rail, eyebrow, mark, cta, proof, panel]) {
    if (el) el.style.opacity = '0'
  }
  if (headline) headline.style.clipPath = 'inset(0 100% 0 0)'
  if (support) support.style.clipPath = 'inset(100% 0 0 0)'

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

  const clearHeroFilters = () => {
    for (const el of [eyebrow, mark, headline, support, cta, proof, panel]) {
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
        [eyebrow, mark, brand, headline, support, cta, proof, panel].filter(
          (el): el is HTMLElement => Boolean(el)
        )
      )
    },
  })
  track(cleanups, timeline)

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
    const rootHeight = entry.rootBounds?.height ?? scroller.clientHeight
    if (!rootHeight) return 0
    return entry.intersectionRect.height / rootHeight
  }

  const ioThresholds = Array.from({ length: 21 }, (_, i) => i / 20)

  const settleMaskItems = (items: HTMLElement[]) => {
    for (const item of items) clearFadeWipe(item)
  }

  const revealMask = (section: HTMLElement | null, items: HTMLElement[]) => {
    if (!section || items.length === 0) return

    let localBucket: Array<() => void> = []
    let visible = false

    const prepare = () => {
      for (const item of items) prepareFadeWipe(item)
    }

    const settle = () => settleMaskItems(items)

    const clearLocal = () => {
      for (const fn of localBucket.reverse()) fn()
      localBucket = []
    }

    const enter = () => {
      if (visible) return
      visible = true
      clearLocal()
      prepare()
      track(
        localBucket,
        animate(items, {
          ...fadeWipeAnimation(1150, stagger(100)),
          onComplete: settle,
        })
      )
    }

    const leave = () => {
      if (!visible) return
      visible = false
      clearLocal()
      if (compact) {
        settle()
        return
      }
      prepare()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const share = viewportShare(entry)
          if (entry.isIntersecting && share >= 0.22) enter()
          else if (share <= 0.1) leave()
        }
      },
      { root: scroller, threshold: ioThresholds }
    )

    prepare()
    observer.observe(section)
    cleanups.push(() => {
      observer.disconnect()
      clearLocal()
      settle()
    })
  }

  // Hero re-entry
  const hero = q(root, '.nuc-home-hero')
  const heroBits = [eyebrow, mark, headline, support, cta, proof, panel].filter(
    (el): el is HTMLElement => Boolean(el)
  )

  {
    let visible = false
    let revealed = false
    let local: Array<() => void> = []

    const clearLocal = () => {
      for (const fn of local.reverse()) fn()
      local = []
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const share = viewportShare(entry)
          if (entry.isIntersecting && share >= 0.22) {
            if (visible) continue
            visible = true
            clearLocal()
            if (!revealed) {
              revealed = true
              continue
            }
            if (!heroBooted) continue
            for (const item of heroBits) {
              item.style.opacity = '0'
              item.style.filter = 'blur(10px)'
              item.style.translate = '0 24px'
            }
            track(
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
          } else if (share <= 0.1 && visible) {
            visible = false
            clearLocal()
            if (compact) {
              settleHeroBits(heroBits)
              continue
            }
            for (const item of heroBits) {
              item.style.opacity = '0'
              item.style.filter = 'blur(10px)'
              item.style.translate = '0 24px'
            }
          }
        }
      },
      { root: scroller, threshold: ioThresholds }
    )

    if (hero) observer.observe(hero)
    cleanups.push(() => {
      observer.disconnect()
      clearLocal()
    })
  }

  revealMask(q(root, '.nuc-investor-thesis'), [
    ...qa(
      root,
      '.nuc-investor-thesis .nuc-home-eyebrow, .nuc-investor-thesis .nuc-home-title, .nuc-investor-thesis .nuc-home-support'
    ),
    ...qa(root, '.nuc-investor-thesis-card'),
  ])

  revealMask(q(root, '.nuc-investor-savings'), [
    ...qa(
      root,
      '.nuc-investor-savings .nuc-home-eyebrow, .nuc-investor-savings .nuc-home-title, .nuc-investor-savings .nuc-home-support, .nuc-investor-savings-note'
    ),
    ...qa(root, '.nuc-investor-savings-card'),
  ])

  revealMask(q(root, '.nuc-investor-wedge'), [
    ...qa(
      root,
      '.nuc-investor-wedge .nuc-home-eyebrow, .nuc-investor-wedge .nuc-home-title, .nuc-investor-wedge .nuc-home-support'
    ),
    ...qa(root, '.nuc-investor-wedge-step'),
  ])

  revealMask(q(root, '.nuc-investor-surface'), [
    ...qa(
      root,
      '.nuc-investor-surface .nuc-home-eyebrow, .nuc-investor-surface .nuc-home-title, .nuc-investor-surface .nuc-home-support'
    ),
    ...qa(root, '.nuc-investor-surface-chip'),
  ])

  revealMask(q(root, '.nuc-investor-ask'), [
    ...qa(
      root,
      '.nuc-investor-ask .nuc-home-title, .nuc-investor-ask .nuc-home-support, .nuc-investor-ask-cta, .nuc-investor-ask-footer'
    ),
  ])

  return () => {
    for (const fn of cleanups.reverse()) fn()
    root.classList.remove('nuc-home-ready', 'nuc-home-booting')
  }
}
