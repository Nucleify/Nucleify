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
} from './frame_motion'

import type {
  CopyStageRevealSpec,
  FrameSectionRevealSpec,
  MaskRevealSpec,
  StackLatticeRevealSpec,
} from '../types/frame'

export type {
  CopyStageRevealSpec,
  FrameSectionRevealSpec,
  MaskRevealSpec,
  StackLatticeRevealSpec,
}

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

export const FRAME_SCROLL_READY = 'nuc-frame-scroll-ready'
/** Live creator reorder — replay this panel's entrance without full frame boot. */
export const FRAME_REPLAY_REVEAL = 'nuc-frame-replay-reveal'

export function markShellScrollReady(root: HTMLElement): void {
  root.dataset.shellScrollReady = '1'
  root.dispatchEvent(new CustomEvent(FRAME_SCROLL_READY))
}

/** Replay entrance for the panel at slide index (section binders listen). */
export function playSlideEntrance(root: HTMLElement, index: number): boolean {
  const scroller = root.querySelector<HTMLElement>('.nuc-scroller') ?? root
  const panels = scroller.querySelectorAll<HTMLElement>(':scope > .nuc-panel')
  if (!panels.length) return false
  const panel = panels[Math.max(0, Math.min(index, panels.length - 1))]
  if (!panel) return false
  const ev = new CustomEvent(FRAME_REPLAY_REVEAL, {
    bubbles: false,
    cancelable: true,
  })
  panel.dispatchEvent(ev)
  return ev.defaultPrevented
}

export function clearShellScrollReady(root: HTMLElement): void {
  delete root.dataset.shellScrollReady
}

export function whenFrameScrollReady(root: HTMLElement): Promise<void> {
  if (root.dataset.shellScrollReady === '1') return Promise.resolve()
  return new Promise((resolve) => {
    const onReady = () => {
      root.removeEventListener(FRAME_SCROLL_READY, onReady)
      resolve()
    }
    root.addEventListener(FRAME_SCROLL_READY, onReady)
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

    const softReorder = () =>
      (section.closest('.nuc-frame') as HTMLElement | null)?.dataset
        .softReorder === '1'

    const prepare = () => {
      if (softReorder()) return
      section.classList.remove('is-reveal-settled')
      handlers.prepare()
    }

    const settle = () => {
      handlers.settle?.()
      section.classList.add('is-reveal-settled')
    }

    const enter = () => {
      if (visible) return
      if (softReorder()) {
        visible = true
        revealed = true
        settle()
        return
      }
      visible = true
      clearLocal()

      if (options?.skipInitialSync && !revealed) {
        revealed = true
        settle()
        return
      }
      if (revealed && opts.compact && options?.replayOnCompact !== true) {
        settle()
        return
      }

      prepare()
      handlers.play(local)
      revealed = true
    }

    const leave = () => {
      if (!visible) return
      // Soft reorder: ignore — prepare/revert would blank icons (CSS opacity 0).
      if (softReorder()) return
      visible = false
      clearLocal()
      if (opts.compact && options?.replayOnCompact !== true) {
        settle()
        return
      }
      prepare()
      // Reorder / scroll dips can land in the IO dead band (leave fired, enter
      // not yet) and leave opacity 0 on-screen — settle that mid-band only.
      requestAnimationFrame(() => {
        if (visible || softReorder()) return
        const rootRect = opts.scroller.getBoundingClientRect()
        const rect = section.getBoundingClientRect()
        const overlap =
          Math.min(rect.bottom, rootRect.bottom) -
          Math.max(rect.top, rootRect.top)
        const share =
          rootRect.height > 0 ? Math.max(0, overlap) / rootRect.height : 0
        if (share > 0.1 && share < 0.22) settle()
      })
    }

    const replay = (event: Event) => {
      event.preventDefault()
      clearLocal()
      visible = true
      // Intentional replay (live reorder / append) — bypass softReorder gate.
      section.classList.remove('is-reveal-settled')
      handlers.prepare()
      handlers.play(local)
      revealed = true
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Live reorder freezes binders — DOM moves must not prepare/play.
        if (softReorder()) return
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

    if (options?.prepareOnBind === true) prepare()
    observer.observe(section)
    section.addEventListener(FRAME_REPLAY_REVEAL, replay)

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
      section.removeEventListener(FRAME_REPLAY_REVEAL, replay)
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
  spec: FrameSectionRevealSpec,
  compactMaxWidth = 960
): () => void {
  const shell = section.closest('.nuc-frame') as HTMLElement | null
  if (!shell) return () => undefined
  if (isQuietBoot() || shell.classList.contains('nuc-static')) {
    return () => undefined
  }

  let stopped = false
  const cleanups: Array<() => void> = []

  void whenFrameScrollReady(shell).then(() => {
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
  entries: Array<{ select: string; reveal: FrameSectionRevealSpec }>,
  cleanups: Array<() => void>,
  compactMaxWidth = 960
): Promise<void> {
  if (isQuietBoot() || root.classList.contains('nuc-static')) return
  await whenFrameScrollReady(root)
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
  spec: FrameSectionRevealSpec,
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
  const markSettled = () => section.classList.add('is-reveal-settled')

  const binders: Record<FrameSectionRevealSpec['kind'], () => void> = {
    mask: () => {
      const sel = (spec as MaskRevealSpec).items
      if (!qa(section, sel).length) return
      bindSection(
        section,
        {
          prepare: () => {
            for (const item of qa(section, sel)) prepareFadeWipe(item)
          },
          settle: () => {
            settleMask(qa(section, sel))
            markSettled()
          },
          play: (local) => {
            const items = qa(section, sel)
            track(
              local,
              animate(items, {
                ...fadeWipeAnimation(1150, stagger(100)),
                onComplete: () => {
                  settleMask(qa(section, sel))
                  markSettled()
                },
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
        markSettled()
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

      const settleStack = () => {
        // Always restore paint — leave() clearLocal() anime.revert() can put
        // inline opacity:0 back even after a prior settle; skipping restore then
        // leaves the stack blank on compact re-entry (CSS cannot beat inline).
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
        markSettled()
      }

      bindSection(
        section,
        {
          prepare: () => {
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
