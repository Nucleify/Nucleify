import {
  clearFadeWipe,
  clearMotionStyles,
  fadeWipeAnimation,
  isQuietBoot,
  openShellIris,
  playCipherDecode,
  prepareFadeWipe,
  q,
  qa,
  type Revertible,
  setIrisRadius,
  settleHeroBits,
  setVar,
  track,
  warmBrandFonts,
} from './shell_motion'
import {
  bindHeroScrollReveal,
  clearShellScrollReady,
  markShellScrollReady,
} from './shell_section_reveal'

export type ShellBootCipher = {
  selector: string
  fallbackText: string
  glyphClass?: string
  deferStartMs?: number | null
  durationBase?: number
  durationStep?: number
  delayBase?: number
  delayStep?: number
  settleMs?: number
}

export type MarketingShellBits = {
  nav?: string
  rail?: string
  eyebrow?: string
  mark?: string
  headline?: string
  support?: string
  cta?: string
  panel?: string
}

export type MarketingShellBoot = {
  mode: 'marketing'
  quietAddsStatic?: boolean
  compactMaxWidth?: number
  includeNav?: boolean
  clearExtra?: string
  cipher: ShellBootCipher
  /** Hero chrome selectors; defaults match `.nuc-hero-*` / `.nuc-rail`. */
  bits?: MarketingShellBits
  iris?: { delayMs?: number; setOrigin?: boolean }
  warmFontsAlways?: boolean
  enableIris?: boolean
}

export type ThankYouShellBoot = {
  mode: 'thankYou'
  quietAddsStatic?: boolean
  compactMaxWidth?: number
  cipher: ShellBootCipher
  iris?: { delayMs?: number; setOrigin?: boolean }
  bits: {
    title: string
    support: string
    cta: string
    cube: string
  }
  enableIris?: boolean
}

export type ShellBootOptions = MarketingShellBoot | ThankYouShellBoot

type AnimeApi = {
  animate: typeof import('animejs').animate
  createTimeline: typeof import('animejs').createTimeline
  stagger: typeof import('animejs').stagger
}

/**
 * Shell boot only (iris, hero assemble / thank-you assemble).
 * Scroll reveals are owned by sections via `useShellSectionReveal`.
 * Pass page-specific selectors / cipher / iris via `options` (see `shell_boot.ts`).
 * Boot seq guards shell classes so a stale stop() cannot strip a newer boot.
 */
let shellBootSeq = 0

export async function playShellAnimations(
  root: HTMLElement,
  options: ShellBootOptions,
  extras?: { enableIris?: boolean }
): Promise<() => void> {
  const cleanups: Array<() => void> = []
  clearShellScrollReady(root)
  const bootSeq = ++shellBootSeq
  root.dataset.shellBoot = String(bootSeq)

  const ownsBoot = () => root.dataset.shellBoot === String(bootSeq)

  const finishBoot = () => {
    if (!ownsBoot()) return
    setIrisRadius(root, '165%')
    root.classList.remove('nuc-booting')
    root.classList.add('nuc-ready')
    // Drop boot flags so CSS cannot yank --shell-iris back to 0% (grid mask).
    const html = document.documentElement
    html.classList.remove('nuc-iris-boot', 'nuc-iris-armed')
    delete html.dataset.nucIrisArmed
  }

  const releaseBootClasses = () => {
    if (!ownsBoot()) return
    root.classList.remove('nuc-ready', 'nuc-booting', 'nuc-static')
  }

  if (
    extras?.enableIris === false ||
    options.enableIris === false ||
    root.classList.contains('nuc-no-iris') ||
    root.dataset.irisEnabled === 'false'
  ) {
    setIrisRadius(root, '165%')
    finishBoot()
    markShellScrollReady(root)
    return () => {
      clearShellScrollReady(root)
      releaseBootClasses()
    }
  }

  // Classic iris: keep/restore html.nuc-iris-boot, arm .nuc-booting after
  // hydrate, then openShellIris does 0% → 165%.
  const html = document.documentElement
  if (!isQuietBoot() && !root.classList.contains('nuc-ready')) {
    html.classList.add('nuc-iris-boot')
    setIrisRadius(root, '0%')
  } else if (html.classList.contains('nuc-iris-boot')) {
    setIrisRadius(root, '0%')
  }
  root.classList.add('nuc-booting')
  root.classList.remove('nuc-ready', 'nuc-static')

  if (isQuietBoot()) {
    setIrisRadius(root, '165%')
    if (options.mode === 'marketing') {
      setVar(root, '--shell-iris-x', '18%')
      setVar(root, '--shell-iris-y', '40%')
    }
    finishBoot()
    if (options.quietAddsStatic && ownsBoot()) root.classList.add('nuc-static')
    markShellScrollReady(root)
    return () => {
      clearShellScrollReady(root)
      releaseBootClasses()
    }
  }

  if (options.mode === 'thankYou') {
    await runThankYouMotion(root, cleanups, finishBoot, options)
  } else {
    await runMarketingMotion(root, cleanups, finishBoot, options)
  }

  return () => {
    for (const fn of cleanups.reverse()) fn()
    clearShellScrollReady(root)
    releaseBootClasses()
  }
}

async function loadAnime(
  cleanups: Array<() => void>
): Promise<AnimeApi | null> {
  try {
    const mod = await import('animejs')
    return {
      animate: mod.animate,
      createTimeline: mod.createTimeline,
      stagger: mod.stagger,
    }
  } catch {
    return null
  }
}

function bindMagneticPointer(
  root: HTMLElement,
  animate: AnimeApi['animate'],
  cleanups: Array<() => void>
): void {
  setVar(root, '--shell-mx', '0')
  setVar(root, '--shell-my', '0')
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
        setVar(root, '--shell-mx', current.x.toFixed(3))
        setVar(root, '--shell-my', current.y.toFixed(3))
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
        setVar(root, '--shell-mx', current.x.toFixed(3))
        setVar(root, '--shell-my', current.y.toFixed(3))
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

async function runThankYouMotion(
  root: HTMLElement,
  cleanups: Array<() => void>,
  finishBoot: () => void,
  preset: ThankYouShellBoot
): Promise<void> {
  const compactMax = preset.compactMaxWidth ?? 767
  const compact = window.matchMedia(`(max-width: ${compactMax}px)`).matches
  const irisBoot = openShellIris(root, cleanups, {
    compact,
    ...preset.iris,
  })
  markShellScrollReady(root)

  const title = q(root, preset.bits.title)
  const support = q(root, preset.bits.support)
  const cta = q(root, preset.bits.cta)
  const cube = q(root, preset.bits.cube)

  for (const el of [title, support, cta, cube]) {
    if (el) el.style.opacity = '0'
  }

  const anime = await loadAnime(cleanups)
  if (!anime) {
    finishBoot()
    return
  }

  const { animate, createTimeline } = anime
  const finalTitle =
    title?.getAttribute('aria-label')?.trim() ||
    title?.textContent?.trim() ||
    preset.cipher.fallbackText

  if (title && !compact) {
    playCipherDecode({
      target: title,
      text: finalTitle,
      cleanups,
      animate,
      glyphClass: preset.cipher.glyphClass,
      durationBase: preset.cipher.durationBase,
      durationStep: preset.cipher.durationStep,
      delayBase: preset.cipher.delayBase,
      delayStep: preset.cipher.delayStep,
      settleMs: preset.cipher.settleMs,
      deferStartMs: preset.cipher.deferStartMs,
    })
  } else if (title) {
    title.classList.remove('is-decoding')
  }

  const done = () => {
    finishBoot()
  }

  const timeline = createTimeline({
    defaults: { ease: 'outExpo' },
    onComplete: done,
  })

  if (title) {
    timeline.add(
      title,
      {
        opacity: [0, 1],
        duration: 420,
        delay: irisBoot ? 220 : 40,
      },
      0
    )
  }
  if (support) {
    timeline.add(
      support,
      {
        opacity: [0, 1],
        y: [14, 0],
        duration: 560,
        delay: irisBoot ? 520 : 220,
      },
      0
    )
  }
  if (cta) {
    timeline.add(
      cta,
      {
        opacity: [0, 1],
        y: [12, 0],
        duration: 520,
        delay: irisBoot ? 640 : 300,
      },
      0
    )
  }
  if (cube) {
    timeline.add(
      cube,
      {
        opacity: [0, 1],
        scale: [0.92, 1],
        duration: 700,
        delay: irisBoot ? 280 : 80,
      },
      0
    )
  }

  track(cleanups, timeline as Revertible)

  const safety = window.setTimeout(done, irisBoot ? 2200 : 1400)
  cleanups.push(() => window.clearTimeout(safety))
  cleanups.push(() => {
    for (const el of [title, support, cta, cube]) clearMotionStyles(el)
  })
}

async function runMarketingMotion(
  root: HTMLElement,
  cleanups: Array<() => void>,
  finishBoot: () => void,
  preset: MarketingShellBoot
): Promise<void> {
  let heroBooted = false
  const markHeroBooted = () => {
    heroBooted = true
  }

  const compactMax = preset.compactMaxWidth ?? 960
  const compact = window.matchMedia(`(max-width: ${compactMax}px)`).matches
  const bits = preset.bits ?? {}
  const nav = preset.includeNav ? q(root, bits.nav ?? '.nuc-nav') : null
  const rail = q(root, bits.rail ?? '.nuc-rail')
  const eyebrow = q(root, bits.eyebrow ?? '.nuc-hero-eyebrow')
  const mark = q(root, bits.mark ?? '.nuc-hero-mark')
  const brand = q(root, preset.cipher.selector)
  const headline = q(root, bits.headline ?? '.nuc-hero-headline')
  const support = q(root, bits.support ?? '.nuc-hero-support')
  const cta = q(root, bits.cta ?? '.nuc-hero-cta')
  const panel = q(root, bits.panel ?? '.nuc-hero-panel')

  for (const el of [
    nav,
    rail,
    eyebrow,
    mark,
    brand,
    headline,
    support,
    cta,
    panel,
    ...qa(root, preset.clearExtra ?? ''),
  ]) {
    clearMotionStyles(el)
  }

  const irisBoot = openShellIris(root, cleanups, {
    compact,
    ...preset.iris,
  })
  // First section must settle during the wipe (section SCSS starts at opacity 0).
  markShellScrollReady(root)

  const anime = await loadAnime(cleanups)
  if (!anime) {
    setIrisRadius(root, '165%')
    finishBoot()
    markHeroBooted()
    return
  }

  const { animate, createTimeline, stagger } = anime
  warmBrandFonts()

  if (!compact) {
    for (const el of [nav, rail, eyebrow, mark, panel]) {
      if (el) el.style.opacity = '0'
    }
    if (headline) prepareFadeWipe(headline)
    if (support) prepareFadeWipe(support)
    if (cta) prepareFadeWipe(cta)
  }

  const finalBrand = brand?.textContent?.trim() || preset.cipher.fallbackText
  // Compact: decode during iris so CSS opacity:0 on brand does not sit empty.
  if (brand) {
    playCipherDecode({
      target: brand,
      text: finalBrand,
      cleanups,
      animate,
      glyphClass: preset.cipher.glyphClass,
      durationBase: preset.cipher.durationBase,
      durationStep: preset.cipher.durationStep,
      delayBase: compact ? 0 : preset.cipher.delayBase,
      delayStep: compact ? 0 : preset.cipher.delayStep,
      settleMs: preset.cipher.settleMs,
      deferStartMs: compact ? 100 : preset.cipher.deferStartMs,
    })
  }

  const hasHeroAssemble = Boolean(
    eyebrow || mark || brand || headline || support || cta || panel
  )

  const waitIrisOpen = async (): Promise<void> => {
    if (!irisBoot) return
    const ms = compact ? 900 : 1700
    await new Promise<void>((resolve) => {
      const t = window.setTimeout(resolve, ms)
      cleanups.push(() => window.clearTimeout(t))
    })
  }

  if (compact || !hasHeroAssemble) {
    await waitIrisOpen()
    finishBoot()
    markHeroBooted()
  }

  const clearHeroFilters = () => {
    for (const el of [eyebrow, mark, panel]) {
      el?.style.removeProperty('filter')
    }
  }

  let scrollReady = false
  const openScrollReveals = () => {
    if (scrollReady) return
    scrollReady = true
    bindHeroScrollReveal(root, {
      compact,
      cleanups,
      animate,
      stagger,
      heroBooted: () => heroBooted,
      bits: { eyebrow, mark, panel, headline, support, cta },
    })
  }

  const finishBootAndBind = () => {
    finishBoot()
    openScrollReveals()
  }

  const timeline = createTimeline({
    defaults: { ease: 'outExpo' },
    onComplete: () => {
      finishBootAndBind()
      markHeroBooted()
      clearHeroFilters()
      settleHeroBits(
        [eyebrow, mark, brand, panel].filter((el): el is HTMLElement =>
          Boolean(el)
        )
      )
    },
  })
  track(cleanups, timeline)

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
  if (cta && !compact) {
    track(
      cleanups,
      animate(cta, {
        ...fadeWipeAnimation(1150, 440),
        onComplete: () => clearFadeWipe(cta),
      })
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

  if (!compact) bindMagneticPointer(root, animate, cleanups)

  if (compact) {
    openScrollReveals()
    return
  }

  const safety = window.setTimeout(() => {
    finishBootAndBind()
    markHeroBooted()
    clearHeroFilters()
    settleHeroBits(
      [eyebrow, mark, brand, panel].filter((el): el is HTMLElement =>
        Boolean(el)
      )
    )
    if (headline) clearFadeWipe(headline)
    if (support) clearFadeWipe(support)
    if (cta) clearFadeWipe(cta)
  }, 3000)
  cleanups.push(() => window.clearTimeout(safety))
}
