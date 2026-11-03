import {
  clearFadeWipe,
  fadeWipeAnimation,
  isQuietBoot,
  prepareFadeWipe,
  q,
  qa,
  settleHeroBits,
  track,
  WIPE_SHIFT,
  WIPE_SKEW,
} from './shell_motion'
export type MaskRevealSpec = {
  kind: 'mask'
  items: string
}

export type CopyStageRevealSpec = {
  kind: 'copy-stage'
  copy: string
  stage: string
  stageDelay?: number
}

export type StackLatticeRevealSpec = {
  kind: 'stack-lattice'
  mask: string
  lattice: string
}

export type ShellSectionRevealSpec =
  | MaskRevealSpec
  | CopyStageRevealSpec
  | StackLatticeRevealSpec

type AnimeApi = {
  animate: typeof import('animejs').animate
  stagger: typeof import('animejs').stagger
}

/* Must match `.nuc-stack-item` --sx/--sy/--sr so settle does not jump. */
const STACK_LATTICE_REST = [
  { x: -4, y: 2, r: -2.5 },
  { x: 6, y: -6, r: 2 },
  { x: 3, y: 4, r: 1.5 },
  { x: -3, y: -4, r: -1.5 },
  { x: -6, y: 4, r: -1.5 },
  { x: 6, y: 0, r: 2 },
  { x: 0, y: 4, r: -1 },
] as const

export const SHELL_SCROLL_READY = 'nuc-shell-scroll-ready'

export function markShellScrollReady(root: HTMLElement): void {
  root.dataset.shellScrollReady = '1'
  root.dispatchEvent(new CustomEvent(SHELL_SCROLL_READY))
}

export function clearShellScrollReady(root: HTMLElement): void {
  delete root.dataset.shellScrollReady
}

export function whenShellScrollReady(root: HTMLElement): Promise<void> {
  if (root.dataset.shellScrollReady === '1') return Promise.resolve()
  return new Promise((resolve) => {
    const onReady = () => {
      root.removeEventListener(SHELL_SCROLL_READY, onReady)
      resolve()
    }
    root.addEventListener(SHELL_SCROLL_READY, onReady)
  })
}

type BindSectionHandlers = {
  prepare: () => void
  play: (local: Array<() => void>) => void
  settle?: () => void
}

type BindSectionOptions = {
  prepareOnBind?: boolean
  skipInitialSync?: boolean
  replayOnCompact?: boolean
}

function createSectionBinder(opts: {
  scroller: HTMLElement
  compact: boolean
  cleanups: Array<() => void>
}) {
  const ioThresholds = Array.from({ length: 21 }, (_, i) => i / 20)

  const bindSection = (
    section: HTMLElement | null,
    handlers: BindSectionHandlers,
    options?: BindSectionOptions
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
        handlers.settle?.()
        return
      }
      if (revealed && opts.compact && options?.replayOnCompact !== true) {
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
      if (opts.compact && options?.replayOnCompact !== true) {
        handlers.settle?.()
        return
      }
      handlers.prepare()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const share = entry.rootBounds?.height
            ? entry.intersectionRect.height / entry.rootBounds.height
            : 0
          if (entry.isIntersecting && share >= 0.22) enter()
          else if (share <= 0.1) leave()
        }
      },
      { root: opts.scroller, threshold: ioThresholds }
    )

    if (options?.prepareOnBind === true) handlers.prepare()
    observer.observe(section)

    // IO initial callback can lag behind programmatic rail jumps — sync once.
    requestAnimationFrame(() => {
      const rootRect = opts.scroller.getBoundingClientRect()
      const rect = section.getBoundingClientRect()
      const overlap =
        Math.min(rect.bottom, rootRect.bottom) -
        Math.max(rect.top, rootRect.top)
      const share =
        rootRect.height > 0 ? Math.max(0, overlap) / rootRect.height : 0
      if (share >= 0.22) enter()
    })

    opts.cleanups.push(() => {
      clearLocal()
      visible = false
      revealed = false
      observer.disconnect()
    })
  }

  return { bindSection }
}

async function loadAnime(): Promise<AnimeApi | null> {
  try {
    const mod = await import('animejs')
    return { animate: mod.animate, stagger: mod.stagger }
  } catch {
    return null
  }
}

/**
 * Wait for shell scroll-ready, then bind this section's reveal.
 * Call from the section that owns the motion config.
 */
export function scheduleShellSectionReveal(
  section: HTMLElement,
  spec: ShellSectionRevealSpec,
  compactMaxWidth = 960
): () => void {
  const shell = section.closest('.nuc-shell') as HTMLElement | null
  if (!shell) return () => undefined
  if (isQuietBoot() || shell.classList.contains('nuc-static')) {
    return () => undefined
  }

  let stopped = false
  const cleanups: Array<() => void> = []

  void whenShellScrollReady(shell).then(() => {
    if (stopped) return
    void bindShellSectionReveal(shell, section, spec, cleanups, compactMaxWidth)
  })

  return () => {
    stopped = true
    for (const fn of cleanups.reverse()) fn()
  }
}

/**
 * Bind reveals for static shells that cannot call section onMounted.
 * `select` is queried under `root`; reveal selectors are relative to that section.
 */
export async function bindShellSectionReveals(
  root: HTMLElement,
  entries: Array<{ select: string; reveal: ShellSectionRevealSpec }>,
  cleanups: Array<() => void>,
  compactMaxWidth = 960
): Promise<void> {
  if (isQuietBoot() || root.classList.contains('nuc-static')) return
  await whenShellScrollReady(root)
  for (const entry of entries) {
    const section = q(root, entry.select)
    if (!section) continue
    await bindShellSectionReveal(
      root,
      section,
      entry.reveal,
      cleanups,
      compactMaxWidth
    )
  }
}

async function bindShellSectionReveal(
  root: HTMLElement,
  section: HTMLElement,
  spec: ShellSectionRevealSpec,
  cleanups: Array<() => void>,
  compactMaxWidth: number
): Promise<void> {
  const anime = await loadAnime()
  if (!anime) return

  const scroller = q(root, '.nuc-scroller') ?? root
  const compact = window.matchMedia(`(max-width: ${compactMaxWidth}px)`).matches
  const { bindSection } = createSectionBinder({ scroller, compact, cleanups })
  const { animate, stagger } = anime

  const firstSection = scroller.querySelector(
    ':scope > .nuc-panel, :scope > .nuc-section, :scope > section, :scope > [class*="nuc-"]'
  )
  // Hero assemble is owned by shell boot — skip section reveal there.
  // Any other first slide (pillars, stack, …) plays wipe with the iris.
  const isHeroInitial =
    section === firstSection &&
    (section.classList.contains('nuc-hero') ||
      Boolean(section.querySelector('.nuc-hero')))
  const sectionOptions = {
    // Hide targets as soon as reveal binds — CSS covers the pre-bind gap.
    prepareOnBind: !isHeroInitial,
    skipInitialSync: isHeroInitial,
    replayOnCompact: false,
  }

  const settleMask = (items: HTMLElement[]) => {
    for (const item of items) clearFadeWipe(item)
  }

  const binders: Record<ShellSectionRevealSpec['kind'], () => void> = {
    mask: () => {
      const items = qa(section, (spec as MaskRevealSpec).items)
      if (!items.length) return
      bindSection(
        section,
        {
          prepare: () => {
            for (const item of items) prepareFadeWipe(item)
          },
          settle: () => settleMask(items),
          play: (local) => {
            track(
              local,
              animate(items, {
                ...fadeWipeAnimation(1150, stagger(100)),
                onComplete: () => settleMask(items),
              })
            )
          },
        },
        sectionOptions
      )
    },

    'copy-stage': () => {
      const {
        copy: copySel,
        stage: stageSel,
        stageDelay,
      } = spec as CopyStageRevealSpec
      const copy = qa(section, copySel)
      const stage = q(section, stageSel)
      if (!copy.length && !stage) return

      const settle = () => {
        settleMask(copy)
        if (stage) {
          stage.style.opacity = '1'
          stage.style.filter = 'none'
          stage.style.transform = 'none'
        }
      }

      bindSection(
        section,
        {
          prepare: () => {
            for (const item of copy) prepareFadeWipe(item)
            if (stage) {
              stage.style.opacity = '0'
              stage.style.transform = `translate3d(${WIPE_SHIFT}px, 0, 0) skewX(${WIPE_SKEW}deg)`
            }
          },
          settle,
          play: (local) => {
            if (copy.length) {
              track(
                local,
                animate(copy, {
                  ...fadeWipeAnimation(1150, stagger(100)),
                  onComplete: () => settleMask(copy),
                })
              )
            }
            if (stage) {
              track(
                local,
                animate(stage, {
                  opacity: [0, 1],
                  x: [WIPE_SHIFT, 0],
                  skewX: [WIPE_SKEW, 0],
                  duration: 1150,
                  delay: stageDelay ?? 400,
                  ease: 'outExpo',
                  onComplete: settle,
                })
              )
              return
            }
            const settleTimer = window.setTimeout(settle, 1400)
            local.push(() => window.clearTimeout(settleTimer))
          },
        },
        sectionOptions
      )
    },

    'stack-lattice': () => {
      const { mask, lattice } = spec as StackLatticeRevealSpec
      const stackMask = qa(section, mask)
      const stackLattice = qa(section, lattice)
      if (!stackMask.length && !stackLattice.length) return

      let latticeSettled = false
      const settleStack = () => {
        if (latticeSettled) return
        latticeSettled = true
        settleMask(stackMask)
        for (const item of stackLattice) {
          item.style.opacity = '1'
          item.style.filter = 'none'
          item.style.removeProperty('transform')
          item.style.removeProperty('translate')
          item.style.removeProperty('rotate')
          item.style.removeProperty('scale')
          item.style.removeProperty('will-change')
          item.classList.remove('nuc-anim-lattice')
        }
      }

      bindSection(
        section,
        {
          prepare: () => {
            latticeSettled = false
            for (const item of stackMask) prepareFadeWipe(item)
            stackLattice.forEach((item, index) => {
              const rest = STACK_LATTICE_REST[index] ?? STACK_LATTICE_REST[0]!
              item.classList.add('nuc-anim-lattice')
              item.style.opacity = '0'
              // No scale — fractional scale + 1px border = flickering corners in Chrome.
              item.style.transform = `translate3d(${rest.x * 5}px, ${rest.y + 64}px, 0) rotate(${rest.r * 2.4}deg)`
              item.style.filter = ''
              item.style.clipPath = ''
            })
          },
          settle: settleStack,
          play: (local) => {
            latticeSettled = false
            const maskStagger = compact ? 60 : 100
            const maskDuration = compact ? 700 : 1150
            const spotlightIndex = stackMask.findIndex((el) =>
              el.classList.contains('nuc-stack-spotlight')
            )
            const latticeStart =
              Math.max(0, spotlightIndex) * maskStagger + (compact ? 120 : 200)
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
              track(
                local,
                animate(stackMask, {
                  ...fadeWipeAnimation(maskDuration, stagger(maskStagger)),
                  onComplete: () => settleMask(stackMask),
                })
              )
            }

            stackLattice.forEach((item, index) => {
              const rest = STACK_LATTICE_REST[index] ?? STACK_LATTICE_REST[0]!
              const isLast = index === stackLattice.length - 1
              track(
                local,
                animate(item, {
                  opacity: [0, 1],
                  x: [rest.x * 5, rest.x],
                  y: [rest.y + 64, rest.y],
                  rotate: [rest.r * 2.4, rest.r],
                  duration: latticeDuration,
                  delay: latticeStart + index * latticeStep,
                  ease: 'outElastic',
                  ...(isLast ? { onComplete: settleStack } : {}),
                })
              )
            })

            armSettle()
          },
        },
        sectionOptions
      )
    },
  }

  binders[spec.kind]()
}

/** Hero scroll re-entry after boot — still owned by the shell player. */
export function bindHeroScrollReveal(
  root: HTMLElement,
  opts: {
    compact: boolean
    cleanups: Array<() => void>
    animate: AnimeApi['animate']
    stagger: AnimeApi['stagger']
    heroBooted: () => boolean
    bits: {
      eyebrow: HTMLElement | null
      mark: HTMLElement | null
      panel: HTMLElement | null
      headline: HTMLElement | null
      support: HTMLElement | null
      cta: HTMLElement | null
    }
  }
): void {
  const scroller = q(root, '.nuc-scroller') ?? root
  const { bindSection } = createSectionBinder({
    scroller,
    compact: opts.compact,
    cleanups: opts.cleanups,
  })

  const hero = q(root, '.nuc-hero')
  const heroBits = [opts.bits.eyebrow, opts.bits.mark, opts.bits.panel].filter(
    (el): el is HTMLElement => Boolean(el)
  )
  const heroWipeBits = [
    opts.bits.headline,
    opts.bits.support,
    opts.bits.cta,
  ].filter((el): el is HTMLElement => Boolean(el))

  const { animate, stagger } = opts

  bindSection(
    hero,
    {
      prepare: () => {
        if (!opts.heroBooted()) return
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
        if (!opts.heroBooted()) return
        if (heroBits.length) {
          track(
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
        if (heroWipeBits.length) {
          track(
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
    { prepareOnBind: false, skipInitialSync: true, replayOnCompact: false }
  )
}
